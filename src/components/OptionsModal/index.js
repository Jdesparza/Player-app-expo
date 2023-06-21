import { View, Text, Modal, StatusBar, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import styles from './styles'
import { AudioContext } from '../../context/AudioProvider'
import { storeThemeBackgroundImgPlayer } from '../../misc/helper'

const OptionsModal = ({ visible, onCloseModal, currentItem, onPlayPress, onPlayListPress }) => {

    const { filename } = currentItem
    const context = useContext(AudioContext)
    const { backgroundImg } = context

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
                                <TouchableOpacity onPress={() => {
                                    context.updateState(context, { backgroundImg: 'BackImgBlur' })
                                    storeThemeBackgroundImgPlayer('BackImgBlur')
                                    onCloseModal()
                                }}>
                                    <Text style={[styles.option, styles.optionTheme(backgroundImg, theme = 'BackImgBlur')]}>Blur</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    context.updateState(context, { backgroundImg: 'BackImgColors' })
                                    storeThemeBackgroundImgPlayer('BackImgColors')
                                    onCloseModal()
                                }}>
                                    <Text style={[styles.option, styles.optionTheme(backgroundImg, theme = 'BackImgColors')]}>Gradient</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    context.updateState(context, { backgroundImg: 'BackImgFilter' })
                                    storeThemeBackgroundImgPlayer('BackImgFilter')
                                    onCloseModal()
                                }}>
                                    <Text style={[styles.option, styles.optionTheme(backgroundImg, theme = 'BackImgFilter')]}>Filter Gray</Text>
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