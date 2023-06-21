import { View, Text, ScrollView, TouchableOpacity, FlatList, Alert } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import styles from './styles'
import PlayListInputModal from '../../components/PlayListInputModal'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AudioContext } from '../../context/AudioProvider'
import PlayListDetail from '../../components/PlayListDetail'

let selectedPlayList = {}

const PlayList = () => {

    const [modalVisible, setModalVisible] = useState(false)
    const [showPlayList, setShowPlayList] = useState(false)

    const context = useContext(AudioContext)
    const { playList, addToPlayList, updateState } = context

    const createPlayList = async (playListName) => {
        const result = await AsyncStorage.getItem('playlist')
        if (result !== null) {
            const audios = []
            if (addToPlayList) {
                audios.push(addToPlayList)
            }
            const newList = {
                id: Date.now(),
                title: playListName,
                audios: audios
            }

            const updatedList = [...playList, newList]
            updateState(context, { addToPlayList: null, playList: updatedList })
            await AsyncStorage.setItem('playlist', JSON.stringify(updatedList))
        }
        setModalVisible(false)
    }

    const renderPlayList = async () => {
        const result = await AsyncStorage.getItem('playlist')
        if (result === null) {
            const defaultPlayList = {
                id: Date.now(),
                title: 'Pistas Fovoritas',
                audios: []
            }

            const newPlayList = [...playList, defaultPlayList]
            updateState(context, { playList: [...newPlayList] })
            return await AsyncStorage.setItem('playlist', JSON.stringify([...newPlayList]))
        }
        updateState(context, { playList: JSON.parse(result) })
    }

    useEffect(() => {
        if (!playList.length) {
            renderPlayList()
        }
    }, [])

    const hanldeBannerPress = async (playList) => {
        if (addToPlayList) {
            const result = await AsyncStorage.getItem('playlist')
            let oldList = []
            let updatedList = []
            let sameAudio = false

            if (result !== null) {
                oldList = JSON.parse(result)
                updatedList = oldList.filter(list => {
                    if (list.id === playList.id) {
                        // we want to check is that same audio is already inside our list or not
                        for (let audio of list.audios) {
                            if (audio.id === addToPlayList.id) {
                                // alert with some message
                                sameAudio = true
                                return
                            }
                        }

                        // otherwise update the playlist
                        list.audios = [...list.audios, addToPlayList]
                    }
                    return list
                })
            }
            if (sameAudio) {
                Alert.alert('Found same audio!', `${addToPlayList.filename} is already inside the list`)
                sameAudio = false
                return updateState(context, { addToPlayList: null })
            }

            updateState(context, { addToPlayList: null, playList: [...updatedList] })
            return AsyncStorage.setItem('playlist', JSON.stringify([...updatedList]))
        }
        // if there is no audio selected then we want open the list
        selectedPlayList = playList
        setShowPlayList(true)
    }


    return (
        <>
            <ScrollView contentContainerStyle={styles.container}>
                {playList.length ? playList.map(item => (
                    <TouchableOpacity key={item.id.toString()} style={styles.playListBanner} onPress={() => hanldeBannerPress(item)}>
                        <Text style={styles.titleList}>{item.title}</Text>
                        <Text style={styles.audioCount}>{item.audios.length !== 1
                            ? `${item.audios.length} canciones`
                            : `${item.audios.length} canción`}</Text>
                    </TouchableOpacity>
                )) : null}

                <TouchableOpacity style={{ marginTop: 15, paddingVertical: 10, }} onPress={() => setModalVisible(true)}>
                    <Text style={styles.playListBtn}>+ Agregar Lista</Text>
                </TouchableOpacity>

                <PlayListInputModal
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    onSubmit={createPlayList}
                />
            </ScrollView>
            <PlayListDetail visible={showPlayList} playList={selectedPlayList} onClose={() => setShowPlayList(false)} />
        </>
    )
}

export default PlayList