import { View, Text, Modal, StatusBar, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './styles'

const OptionsModal = ({ visible, onCloseModal, currentItem, onPlayPress, onPlayListPress }) => {

    const { filename } = currentItem

    return (
        <>
            <StatusBar hidden={true} />
            <Modal visible={visible} transparent animationType='slide' >
                <View style={styles.modal}>
                    <Text numberOfLines={2} style={styles.title}>{filename}</Text>
                    <View style={styles.optionCont}>
                        <TouchableOpacity onPress={onPlayPress}>
                            <Text style={styles.option}>Play</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onPlayListPress}>
                            <Text style={styles.option}>Add to Playlist</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={onCloseModal} >
                    <View style={styles.modalBG} />
                </TouchableWithoutFeedback>
            </Modal>
        </>
    )
}

export default OptionsModal