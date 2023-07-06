import { View, Text, Modal, FlatList, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, Alert } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import styles from './styles'
import AudioListItem from '../AudioListItem'
import { selectAudio } from '../../misc/audioController'
import { AudioContext } from '../../context/AudioProvider'
import OptionsModal from '../OptionsModal'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { COLOR_PRIMARY } from '../../utils/paleta'

import { MaterialCommunityIcons } from '@expo/vector-icons';

const PlayListDetail = ({ navigationPlayer, visible, playList, onClose }) => {

    const context = useContext(AudioContext)
    const [optionModalVisible, setOptionModalVisible] = useState(false)
    const [selectedItem, setSelectedItem] = useState({})
    const [audios, setAudios] = useState([]);

    const playAudio = async (audio) => {
        await selectAudio(audio, context, { activePlayList: playList, isPlayListRunning: true })
    }

    useEffect(() => {
        context.loadPreviousAudio()
        context.loadPreviousTheme()
        setAudios(playList.audios)
    }, [playList]);

    const closeOptionsModal = () => {
        setSelectedItem({})
        setOptionModalVisible(false)
    }

    const removeAudio = async () => {
        let isPlaying = context.isPlaying;
        let isPlayListRunning = context.isPlayListRunning;
        let soundObj = context.soundObj;
        let playbackPosition = context.playbackPosition;
        let activePlayList = context.activePlayList;

        if (context.isPlayListRunning && context.currentAudio.id === selectedItem.id) {
            // stop
            await context.playbackObj.stopAsync();
            await context.playbackObj.unloadAsync();
            isPlaying = false;
            isPlayListRunning = false;
            soundObj = null;
            playbackPosition = 0;
            activePlayList = [];
        }

        const newAudios = audios.filter(audio => audio.id !== selectedItem.id)
        const result = await AsyncStorage.getItem('playlist')
        if (result !== null) {
            const oldPlayLists = JSON.parse(result)
            const updatedPlayLists = oldPlayLists.filter((item) => {
                if (item.id === playList.id) {
                    item.audios = newAudios
                }

                return item
            })
            AsyncStorage.setItem('playlist', JSON.stringify(updatedPlayLists))
            context.updateState(context, {
                playList: updatedPlayLists,
                isPlayListRunning,
                activePlayList,
                playbackPosition,
                isPlaying,
                soundObj
            })
        }
        setAudios(newAudios)
        closeOptionsModal()
    }

    const removePlayList = () => {

        Alert.alert(
            //title
            'Eliminar Lista',
            //body
            `Estas seguro de eliminar la lista:\n${playList.title}`,
            [
                {
                    text: 'Eliminar', onPress: async () => {
                        let isPlaying = context.isPlaying;
                        let isPlayListRunning = context.isPlayListRunning;
                        let soundObj = context.soundObj;
                        let playbackPosition = context.playbackPosition;
                        let activePlayList = context.activePlayList;

                        if (context.isPlayListRunning && activePlayList.id === playList.id) {
                            // stop
                            await context.playbackObj.stopAsync();
                            await context.playbackObj.unloadAsync();
                            isPlaying = false;
                            isPlayListRunning = false;
                            soundObj = null;
                            playbackPosition = 0;
                            activePlayList = [];
                        }

                        const result = await AsyncStorage.getItem('playlist')
                        if (result !== null) {
                            const oldPlayLists = JSON.parse(result)
                            const updatedPlayLists = oldPlayLists.filter((item) => item.id !== playList.id)

                            AsyncStorage.setItem('playlist', JSON.stringify(updatedPlayLists))
                            context.updateState(context, {
                                playList: updatedPlayLists,
                                isPlayListRunning,
                                activePlayList,
                                playbackPosition,
                                isPlaying,
                                soundObj
                            })
                        }
                        onClose()
                    }
                },
                {
                    text: 'Cancelar',
                    onPress: () => { },
                    style: 'cancel',
                },
            ],
            { cancelable: true }
        );
    }

    return (
        <>
            <Modal visible={visible} animationType='slide' transparent onRequestClose={onClose}>
                <View style={styles.container} >
                    <View style={styles.playListHeaderContainer}>
                        <Text style={[styles.title, playList.title === 'Pistas Fovoritas' ? { textAlign: 'center' } : null]}>{playList.title}</Text>
                        {playList.title !== 'Pistas Fovoritas' && (
                            <TouchableOpacity onPress={removePlayList}>
                                <MaterialCommunityIcons name="delete-circle" size={40} color="#ff3333" />
                            </TouchableOpacity>
                        )}
                    </View>
                    {(audios && audios.length) ? (
                        <FlatList
                            data={audios}
                            keyExtractor={item => item.id.toString()}
                            renderItem={({ item }) =>
                                <AudioListItem filename={item.filename}
                                    duration={item.duration}
                                    isPlaying={context.isPlaying}
                                    activeListItem={context.currentAudio !== undefined ? item.id === context.currentAudio.id : false}
                                    onAudioPress={() => {
                                        playAudio(item)
                                        navigationPlayer(item)
                                    }}
                                    onOptionPress={() => {
                                        setSelectedItem(item);
                                        setOptionModalVisible(true);
                                    }}
                                />
                            }
                            contentContainerStyle={styles.listContainer}
                        />
                    ) : (
                        <View style={{ margin: 30, justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                            <Text style={{ color: COLOR_PRIMARY, fontSize: 20, opacity: .5 }}>
                                No Audio
                            </Text>
                        </View>
                    )}
                </View>
                <TouchableWithoutFeedback onPress={onClose}>
                    <View style={[StyleSheet.absoluteFillObject, styles.modalBG]} />
                </TouchableWithoutFeedback>
            </Modal>
            <OptionsModal
                visible={optionModalVisible}
                onCloseModal={closeOptionsModal}
                currentItem={selectedItem}
                options={[
                    { title: 'Remove from PlayList', onPress: removeAudio }
                ]}
            />
        </>
    )
}

export default PlayListDetail