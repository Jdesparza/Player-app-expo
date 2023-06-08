import React, { Component, useState } from 'react'
import { Text, View, ScrollView, Dimensions, SafeAreaView } from 'react-native'
import styles from '../ListMusic/styles'
import { AudioContext } from '../../context/AudioProvider'
import { LayoutProvider, RecyclerListView } from 'recyclerlistview'
import AudioListItem from '../../components/AudioListItem'
import OptionsModal from '../../components/OptionsModal'
import { Audio } from 'expo-av'
import { pause, play, playNext, resume } from '../../misc/audioController'
import { storeAudioForNextOpening } from '../../misc/helper'

export class ListMusic extends Component {

    static contextType = AudioContext

    constructor(props) {
        super(props)
        this.state = {
            playing: false,
            optionModalVisible: false,
        }

        this.currentItem = {}
    }

    layoutProvider = new LayoutProvider((i) => 'audio', (type, dim) => {
        switch (type) {
            case 'audio':
                dim.width = Dimensions.get('window').width
                dim.height = 70
                break
            default:
                dim.width = 0
                dim.height = 0
        }
    })

    // onPlaybackStatusUpdate = async (playbackStatus) => {
    //     // console.log(playbackStatus)
    //     if (playbackStatus.isLoaded && playbackStatus.isPlaying) {
    //         this.context.updateState(this.context, {
    //             playbackPosition: playbackStatus.positionMillis,
    //             playbackDuration: playbackStatus.durationMillis
    //         })
    //     }

    //     if (playbackStatus.didJustFinish) {
    //         const nextAudioIndex = this.context.currentAudioIndex + 1
    //         // there is no next audio to play or the current audio is the last
    //         if (nextAudioIndex >= this.context.totalAudioCount) {
    //             this.context.playbackObj.unloadAsync()
    //             this.context.updateState(this.context, {
    //                 soundObj: null,
    //                 currentAudio: this.context.audioFiles[0],
    //                 isPlaying: false,
    //                 currentAudioIndex: 0,
    //                 playbackPosition: null,
    //                 playbackDuration: null
    //             })
    //             return await storeAudioForNextOpening(this.context.audioFiles[0], 0)
    //         }
    //         // otherwise we eant to select the next audio
    //         const audio = this.context.audioFiles[nextAudioIndex]
    //         const status = await playNext(this.context.playbackObj, audio.uri)
    //         this.context.updateState(this.context, {
    //             soundObj: status,
    //             currentAudio: audio,
    //             isPlaying: true,
    //             currentAudioIndex: nextAudioIndex
    //         })
    //         await storeAudioForNextOpening(audio, nextAudioIndex)
    //     }
    // }

    handleAudioPress = async (item) => {

        const { soundObj, playbackObj, currentAudio, updateState, audioFiles } = this.context

        // playing audio for the first time
        if (soundObj === null) {
            const playbackObj = new Audio.Sound()
            const status = await play(playbackObj, item.uri)
            const index = audioFiles.indexOf(item)
            // console.log(playbackObj)
            updateState(this.context, { playbackObj: playbackObj, soundObj: status, currentAudio: item, isPlaying: true, currentAudioIndex: index })
            playbackObj.setOnPlaybackStatusUpdate(this.context.onPlaybackStatusUpdate)
            return storeAudioForNextOpening(item, index)
        }

        // pause audio
        if (soundObj.isLoaded && soundObj.isPlaying &&
            currentAudio.id === item.id) {
            // audioController.pause()
            const status = await pause(playbackObj)
            return updateState(this.context, { soundObj: status, isPlaying: false })
        }

        // resume audio
        if (soundObj.isLoaded && !soundObj.isPlaying &&
            currentAudio.id === item.id) {
            const status = await resume(playbackObj)
            return updateState(this.context, { soundObj: status, isPlaying: true })
        }

        // select another audio
        if (soundObj.isLoaded && currentAudio.id !== item.id) {
            const status = await playNext(playbackObj, item.uri)
            const index = audioFiles.indexOf(item)
            updateState(this.context, { soundObj: status, currentAudio: item, isPlaying: true, currentAudioIndex: index })
            return storeAudioForNextOpening(item, index)
        }
    }

    componentDidMount() {
        this.context.loadPreviousAudio()
    }

    rowRenderer = (type, item, index, extendedState) => {

        return <AudioListItem uri={item.uri} filename={item.filename} duration={item.duration} isPlaying={extendedState.isPlaying}
            activeListItem={this.context.currentAudioIndex === index}
            onAudioPress={
                () => {
                    this.handleAudioPress(item)
                }
            }
            onOptionPress={
                () => {
                    this.currentItem = item
                    this.setState({ ...this.state, optionModalVisible: true })
                }
            } />
    }

    render() {
        return <AudioContext.Consumer>
            {({ dataProvider, isPlaying }) => {
                if (!dataProvider._data.length) return null
                return (
                    <SafeAreaView style={{ flex: 1, backgroundColor: 'rgba(250,250,250,1)' }}>
                        <RecyclerListView
                            dataProvider={dataProvider}
                            layoutProvider={this.layoutProvider}
                            rowRenderer={this.rowRenderer}
                            extendedState={{ isPlaying }}
                            scrollViewProps={{
                                showsVerticalScrollIndicator: false
                            }}
                        />
                        <OptionsModal
                            visible={this.state.optionModalVisible}
                            onCloseModal={() => this.setState({ ...this.state, optionModalVisible: false })}
                            currentItem={this.currentItem}
                            onPlayPress={() => console.log('playing audio')}
                            onPlayListPress={() => console.log('adding to the playlist')}
                        />
                    </SafeAreaView>
                )
            }}
        </AudioContext.Consumer>
    }
}

export default ListMusic
