import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import styles from './styles'

import MusicInfo from 'expo-music-info';


import { MaterialCommunityIcons } from '@expo/vector-icons';
import color from '../../misc/color';

const getFilename = (filename) => {
    // Eliminar el formato .mp3 y otros formatos de audio
    const cleanedFilename = filename.replace(/\.(mp3|m4a)$/i, '');

    // Eliminar otros formatos de audio
    const cleanedFilenameWithoutAudio = cleanedFilename.replace(/\.(MP3|MP3_160K|MP3_128K)$/i, '');

    return cleanedFilenameWithoutAudio;
}

const AudioListItem = ({ uri, filename, onOptionPress, onAudioPress, isActivePlay }) => {

    const [metadata, setMetadata] = useState(null)

    useEffect(() => {
        // console.log(item.uri);
        infoAudio()
        // console.log(filename)
    }, [])

    const infoAudio = async () => {
        let metadataInfo = await MusicInfo.getMusicInfoAsync(uri, {
            title: true,
            artist: true,
            album: false,
            genre: false,
            picture: true
        });
        setMetadata(metadataInfo)
    }


    return (
        <View style={styles.container(isActivePlay)}>
            <TouchableOpacity style={styles.leftCont} onPress={onAudioPress} >
                <View style={styles.imgCont}>
                    <Image style={styles.imgAudio} source={metadata !== null && metadata.picture !== null ?
                        { uri: metadata.picture.pictureData }
                        :
                        require('../../../assets/images/music.jpg')} />
                    <Image style={[styles.imgAudioPlay(isActivePlay), styles.imgAudio]} source={require('../../../assets/images/FB_IMG_1674360672194.jpg')} />
                </View>
                <View style={styles.infoAudio}>
                    <Text numberOfLines={1} style={styles.filenameAudio(isActivePlay)}>{metadata !== null && metadata.title ? metadata.title : getFilename(filename)}</Text>
                    <Text numberOfLines={1} style={styles.artistAudio}>{metadata !== null && metadata.artist ? metadata.artist : 'desconocido'}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rightCont} onPress={onOptionPress}>
                <MaterialCommunityIcons name="dots-vertical" size={24} color={isActivePlay ? 'white' : color.FONT_MEDIUM} />
            </TouchableOpacity>
        </View>
    )
}

export default AudioListItem