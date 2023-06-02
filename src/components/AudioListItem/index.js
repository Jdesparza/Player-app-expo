import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import styles from './styles'

import { MaterialCommunityIcons } from '@expo/vector-icons';
import color from '../../misc/color';

const getInfoText = (filename) => {
    // return filename.split('.')[0]
    return filename
}

const AudioListItem = ({ item, onOptionPress, onAudioPress, isActivePlay }) => {

    return (
        <View style={styles.container(isActivePlay)}>
            <TouchableOpacity style={styles.leftCont} onPress={onAudioPress}>
                <View style={styles.imgCont}>
                    <Image style={styles.imgAudio} source={require('../../../assets/images/music.jpg')} />
                    <Image style={[styles.imgAudioPlay(isActivePlay), styles.imgAudio]} source={require('../../../assets/images/FB_IMG_1674360672194.jpg')} />
                </View>
                <View style={styles.infoAudio}>
                    <Text numberOfLines={1} style={styles.filenameAudio(isActivePlay)}>{getInfoText(item.filename)}</Text>
                    <Text numberOfLines={1} style={styles.artistAudio}>{item.duration}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rightCont} onPress={onOptionPress}>
                <MaterialCommunityIcons name="dots-vertical" size={24} color={isActivePlay ? 'white' : color.FONT_MEDIUM} />
            </TouchableOpacity>
        </View>
    )
}

export default AudioListItem