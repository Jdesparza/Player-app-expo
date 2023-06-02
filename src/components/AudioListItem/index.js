import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import styles from './styles'

import { MaterialCommunityIcons } from '@expo/vector-icons';
import color from '../../misc/color';

const getInfoText = (filename) => {
    return filename.split('.')[0]
}

const AudioListItem = ({ item, onOptionPress, onPlayAudioPress }) => {

    const [isActivePlay, setIsActivePlay] = useState(null)

    return (
        <TouchableOpacity style={styles.container(isActivePlay)} onPress={() => {
            setIsActivePlay(!isActivePlay)
        }}>
            <View style={styles.leftCont}>
                <View style={styles.imgCont}>
                    <Image style={styles.imgAudio} source={require('../../../assets/images/music.jpg')} />
                    <Image style={[styles.imgAudioPlay(isActivePlay), styles.imgAudio]} source={require('../../../assets/images/FB_IMG_1674360672194.jpg')} />
                </View>
                <View style={styles.infoAudio}>
                    <Text numberOfLines={1} style={styles.filenameAudio(isActivePlay)}>{getInfoText(item.filename)}</Text>
                    <Text numberOfLines={1} style={styles.artistAudio}>{item.duration}</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.rightCont} onPress={onOptionPress}>
                <MaterialCommunityIcons name="dots-vertical" size={24} color={isActivePlay ? 'white' : color.FONT_MEDIUM} />
            </TouchableOpacity>
        </TouchableOpacity>
    )
}

export default AudioListItem