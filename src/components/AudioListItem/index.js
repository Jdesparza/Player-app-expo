import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import styles from './styles'

import { MaterialCommunityIcons } from '@expo/vector-icons';
import color from '../../misc/color';

const getFilename = (filename) => {
    // Eliminar el formato .mp3 y otros formatos de audio
    const cleanedFilename = filename.replace(/\.(mp3|m4a)$/i, '');

    // Eliminar otros formatos de audio
    const cleanedFilenameWithoutAudio = cleanedFilename.replace(/\.(MP3|MP3_160K|MP3_128K)$/i, '');

    return cleanedFilenameWithoutAudio;
}

const renderPlayPauseIcon = isPlaying => {
    if (isPlaying) return <Image style={[styles.imgAudio, styles.imgAudioPlay(isPlaying)]} source={require('../../../assets/images/sound.gif')} />
    return <Image style={[styles.imgAudio, styles.imgAudioPlay(isPlaying)]} source={require('../../../assets/images/sound_pause.png')} />
}

const AudioListItem = ({ uri, filename, duration, onOptionPress, onAudioPress, isPlaying, activeListItem }) => {

    return (
        <View style={styles.container(activeListItem, isPlaying)}>
            <TouchableOpacity style={styles.leftCont} onPress={onAudioPress} >
                <View style={styles.imgCont}>
                    <Image style={[styles.imgAudio]} source={require('../../../assets/images/music.jpg')} />
                    {activeListItem && renderPlayPauseIcon(isPlaying)}
                </View>
                <View style={styles.infoAudio}>
                    <Text numberOfLines={1} style={styles.filenameAudio(activeListItem, isPlaying)}>{getFilename(filename)}</Text>
                    <Text numberOfLines={1} style={styles.artistAudio}>{duration}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rightCont} onPress={onOptionPress}>
                <MaterialCommunityIcons name="dots-vertical" size={24} color={activeListItem ? 'white' : color.FONT_MEDIUM} />
            </TouchableOpacity>
        </View>
    )
}

export default AudioListItem