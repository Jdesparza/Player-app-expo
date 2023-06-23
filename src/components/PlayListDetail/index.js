import { View, Text, Modal, FlatList, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import React, { useContext } from 'react'
import styles from './styles'
import AudioListItem from '../AudioListItem'
import { selectAudio } from '../../misc/audioController'
import { AudioContext } from '../../context/AudioProvider'

const PlayListDetail = ({ visible, playList, onClose }) => {

    const context = useContext(AudioContext)

    const playAudio = async (audio) => {
        await selectAudio(audio, context, { activePlayList: playList, isPlayListRunning: true })
    }

    return (
        <Modal visible={visible} animationType='slide' transparent onRequestClose={onClose}>
            <View style={styles.container} >
                <Text style={styles.title}>{playList.title}</Text>
                <FlatList
                    data={playList.audios}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) =>
                        <AudioListItem filename={item.filename}
                            duration={item.duration}
                            isPlaying={context.isPlaying}
                            activeListItem={item.id === context.currentAudio.id}
                            onAudioPress={() => playAudio(item)}
                        />
                    }
                    contentContainerStyle={styles.listContainer}
                />
            </View>
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={[StyleSheet.absoluteFillObject, styles.modalBG]} />
            </TouchableWithoutFeedback>
        </Modal>
    )
}

export default PlayListDetail