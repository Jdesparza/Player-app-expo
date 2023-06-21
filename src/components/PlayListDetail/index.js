import { View, Text, Modal, FlatList, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import styles from './styles'
import AudioListItem from '../AudioListItem'

const PlayListDetail = ({ visible, playList, onClose }) => {
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