import { View, Text, Modal, StatusBar, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './styles'

const OptionsModal = ({ visible, onCloseModal, currentItem, onPlayPress, onPlayListPress, onBackImgBlurPress, onBackImgColorsPress }) => {

    const { filename } = currentItem

    return (
        <>
            <StatusBar hidden={true} />
            <Modal visible={visible} transparent animationType='slide' >
                <View style={styles.modal}>
                    <Text numberOfLines={2} style={styles.title}>{filename}</Text>
                    <View style={styles.optionCont}>
                        <View style={styles.BackContainerImg}>
                            <Text style={styles.BackImgTitle}>Theme Image</Text>
                            <View style={styles.BackImgTouch}>
                                <TouchableOpacity onPress={onBackImgBlurPress}>
                                    <Text style={styles.option}>Img Blur Circle</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={onBackImgColorsPress}>
                                    <Text style={styles.option}>Img Gradient Colors</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
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