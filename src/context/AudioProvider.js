import React, { Component, createContext } from 'react'
import { Text, View, Alert } from 'react-native'

import * as MediaLibrary from 'expo-media-library'
import { COLOR_PRIMARY } from '../utils/paleta'

import { DataProvider } from 'recyclerlistview'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Audio } from 'expo-av'
import { playNext } from '../misc/audioController'
import { storeAudioForNextOpening } from '../misc/helper'
import * as Notifications from 'expo-notifications';

export const AudioContext = createContext()

export class AudioProvider extends Component {

    // canAskAgain: true
    // expires: "never"
    // granted: false
    // status: "undetermined"

    constructor(props) {
        super(props)
        this.state = {
            audioFiles: [],
            playList: [],
            addToPlayList: null,
            permissionError: false,
            dataProvider: new DataProvider((r1, r2) => r1 !== r2),
            playbackObj: null,
            soundObj: null,
            currentAudio: {},
            isPlaying: false,
            isPlayListRunning: false,
            activePlayList: [],
            currentAudioIndex: null,
            playbackPosition: null,
            playbackDuration: null,
            backgroundImg: null,
            isScreen: false
        }
        this.totalAudioCount = 0
    }

    permissionAllert = () => {
        Alert.alert('Permission Required', 'This app needs to read audio files!', [
            {
                text: 'I am Ready',
                onPress: () => this.getPermissionMediaLibrary()
            },
            {
                text: 'cancel',
                onPress: () => this.permissionAllert()
            }
        ])
    }

    getAudioFiles = async () => {

        const { dataProvider, audioFiles } = this.state

        let media = await MediaLibrary.getAssetsAsync({
            mediaType: 'audio'
        })

        media = await MediaLibrary.getAssetsAsync({
            mediaType: 'audio',
            first: media.totalCount,
        })
        this.totalAudioCount = media.totalCount

        this.setState({ ...this.state, dataProvider: dataProvider.cloneWithRows([...audioFiles, ...media.assets]), audioFiles: [...audioFiles, ...media.assets] })
    }

    loadPreviousAudio = async () => {
        // TODO: we need to load audio from our async storage
        let previousAudio = await AsyncStorage.getItem('previousAudio')
        let currentAudio
        let currentAudioIndex
        let playbackPosition

        if (previousAudio === null) {
            currentAudio = this.state.audioFiles[0]
            currentAudioIndex = 0
            playbackPosition = 0
        } else {
            previousAudio = JSON.parse(previousAudio)
            currentAudio = previousAudio.audio
            currentAudioIndex = previousAudio.index
            if (previousAudio.audio.lastPosition) {
                playbackPosition = previousAudio.audio.lastPosition
            } else {
                playbackPosition = 0
            }
        }

        this.setState({ ...this.state, currentAudio, currentAudioIndex, playbackPosition })
    }

    loadPreviousTheme = async () => {
        // TODO: we need to load audio from our async storage
        let previousTheme = await AsyncStorage.getItem('previousTheme')
        let backgroundImg

        if (previousTheme === null) {
            backgroundImg = 'BackImgBlur'
        } else {
            backgroundImg = JSON.parse(previousTheme).theme
        }

        this.setState({ ...this.state, backgroundImg })
    }

    getPermissionMediaLibrary = async () => {
        const permission = await MediaLibrary.getPermissionsAsync()

        if (permission.granted) {
            this.getAudioFiles()
        }

        if (!permission.granted && permission.canAskAgain) {
            const { status, canAskAgain } = await MediaLibrary.requestPermissionsAsync()

            if (status === 'denied' && canAskAgain) {
                this.permissionAllert()
            }

            if (status === 'granted') {
                this.getAudioFiles()
            }

            if (status === 'denied' && !canAskAgain) {
                this.setState({ ...this.state, permissionError: true })
            }
        }
    }

    getNotificationPermission = async () => {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== 'granted') {
            console.log('El permiso de notificación no ha sido otorgado');
        }
    };

    onPlaybackStatusUpdate = async (playbackStatus) => {
        // console.log(playbackStatus)
        if (playbackStatus.isLoaded && playbackStatus.isPlaying) {
            this.updateState(this, {
                playbackPosition: playbackStatus.positionMillis,
                playbackDuration: playbackStatus.durationMillis
            })
        }

        if (playbackStatus.isLoaded && !playbackStatus.isPlaying) {
            storeAudioForNextOpening(
                this.state.currentAudio,
                this.state.currentAudioIndex,
                playbackStatus.positionMillis,
                playbackStatus.durationMillis
            )
        }

        if (playbackStatus.didJustFinish) {
            if (this.state.isPlayListRunning) {
                let audio
                const indexOnPlayList = this.state.activePlayList.audios.findIndex(({ id }) => id === this.state.currentAudio.id)
                const nextIndex = indexOnPlayList + 1
                audio = this.state.activePlayList.audios[nextIndex]

                if (!audio) audio = this.state.activePlayList.audios[0]

                const indexOnAllList = this.state.audioFiles.findIndex(({ id }) => id === audio.id)

                const status = await playNext(this.state.playbackObj, audio.uri)
                return this.updateState(this, {
                    soundObj: status,
                    isPlaying: true,
                    currentAudio: audio,
                    currentAudioIndex: indexOnAllList
                })
            }
            const nextAudioIndex = this.state.currentAudioIndex + 1
            // there is no next audio to play or the current audio is the last
            if (nextAudioIndex >= this.totalAudioCount) {
                this.state.playbackObj.unloadAsync()
                this.updateState(this, {
                    soundObj: null,
                    currentAudio: this.state.audioFiles[0],
                    isPlaying: false,
                    currentAudioIndex: 0,
                    playbackPosition: null,
                    playbackDuration: null
                })
                return await storeAudioForNextOpening(this.state.audioFiles[0], 0)
            }
            // otherwise we eant to select the next audio
            const audio = this.state.audioFiles[nextAudioIndex]
            const status = await playNext(this.state.playbackObj, audio.uri)
            this.updateState(this, {
                soundObj: status,
                currentAudio: audio,
                isPlaying: true,
                currentAudioIndex: nextAudioIndex
            })
            await storeAudioForNextOpening(audio, nextAudioIndex)
        }
    }

    async componentDidMount() {
        this.getNotificationPermission()
        this.getPermissionMediaLibrary()

        try {
            await Audio.setAudioModeAsync({
                staysActiveInBackground: true,
                // shouldDuckAndroid: true,
                // playThroughEarpieceAndroid: true,
            });
        } catch (error) {
            console.log('error, setAudio ', error)
        }

        if (this.state.playbackObj === null) {
            this.setState({ ...this.state, playbackObj: new Audio.Sound() })
        }
    }

    updateState = (prevState, newState = {}) => {
        this.setState({ ...prevState, ...newState })
    }

    render() {
        const { dataProvider, audioFiles, playList, addToPlayList, permissionError, playbackObj, soundObj, currentAudio, isPlaying,
            isScreen,
            currentAudioIndex, playbackPosition, playbackDuration, backgroundImg, isPlayListRunning, activePlayList, } = this.state

        if (permissionError) return <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Text style={{ fontSize: 25, textAlign: 'center', color: COLOR_PRIMARY }}>It looks like you haven't accept the permission</Text>
        </View>
        return <AudioContext.Provider value={{
            audioFiles, dataProvider, playList, addToPlayList, playbackObj, soundObj, currentAudio, isPlaying, currentAudioIndex,
            playbackPosition, playbackDuration, isPlayListRunning, activePlayList, isScreen,
            totalAudioCount: this.totalAudioCount, updateState: this.updateState, loadPreviousAudio: this.loadPreviousAudio,
            onPlaybackStatusUpdate: this.onPlaybackStatusUpdate, backgroundImg, loadPreviousTheme: this.loadPreviousTheme
        }} >
            {this.props.children}
        </AudioContext.Provider>
    }
}

export default AudioProvider
