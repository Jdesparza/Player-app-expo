import React, { useContext, useState, useEffect } from "react";
import { Image, Text, View, Button, SafeAreaView, TouchableOpacity } from "react-native";
import BackgroundImgPlayerBlur from "../../components/BackgroundImgPlayerBlur";
import styles from "./styles";

import Slider from '@react-native-community/slider';
import { COLOR_PRIMARY, COLOR_QUATERNARY } from "../../utils/paleta";
import PlayerButtton from "../../components/PlayerButton";
import { AudioContext } from "../../context/AudioProvider";
import { pause, play, playNext, resume } from "../../misc/audioController";
import { storeAudioForNextOpening, storeThemeBackgroundImgPlayer } from "../../misc/helper";
import BackgroundImageColors from "../../components/BackgroundImageColors";

import { MaterialCommunityIcons } from '@expo/vector-icons';
import color from "../../misc/color";
import OptionsModal from "../../components/OptionsModal";
import BackgroundImageFilter from "../../components/BackgroundImageFilter";

const getFilename = (filename) => {
    if (filename !== undefined) {
        // Eliminar el formato .mp3 y otros formatos de audio
        const cleanedFilename = filename.replace(/\.(mp3|m4a)$/i, '');

        // Eliminar otros formatos de audio
        const cleanedFilenameWithoutAudio = cleanedFilename.replace(/\.(MP3|MP3_160K|MP3_128K)$/i, '');

        return cleanedFilenameWithoutAudio;
    }
    return 'Título desconocido'
}

const Player = () => {

    const context = useContext(AudioContext)

    const [optionModalVisible, setOptionModalVisible] = useState(false)

    const { playbackPosition, playbackDuration } = context

    const calculateSeebBar = () => {
        if (playbackPosition !== null && playbackDuration !== null) {
            return playbackPosition / playbackDuration
        }
        return 0
    }

    const handlePlayPause = async () => {
        // Play
        if (context.soundObj === null) {
            const audio = context.currentAudio
            const status = await play(context.playbackObj, audio.uri)
            context.playbackObj.setOnPlaybackStatusUpdate(context.onPlaybackStatusUpdate)
            return context.updateState(context, {
                soundObj: status,
                currentAudio: audio,
                isPlaying: true,
                currentAudioIndex: context.currentAudioIndex
            })
        }
        // Pause
        if (context.soundObj && context.soundObj.isPlaying) {
            const status = await pause(context.playbackObj)
            return context.updateState(context, {
                soundObj: status,
                isPlaying: false,
            })
        }
        // Resume
        if (context.soundObj && !context.soundObj.isPlaying) {
            const status = await resume(context.playbackObj)
            return context.updateState(context, {
                soundObj: status,
                isPlaying: true,
            })
        }
    }

    const handleNext = async () => {
        const { isLoaded } = await context.playbackObj.getStatusAsync()
        const isLastAudio = context.currentAudioIndex + 1 === context.totalAudioCount
        let audio = context.audioFiles[context.currentAudioIndex + 1]
        let index
        let status

        if (!isLoaded && !isLastAudio) {
            index = context.currentAudioIndex + 1
            status = await play(context.playbackObj, audio.uri)
        }
        if (isLoaded && !isLastAudio) {
            index = context.currentAudioIndex + 1
            status = await playNext(context.playbackObj, audio.uri)
        }
        if (isLastAudio) {
            index = 0
            audio = context.audioFiles[index]
            if (isLoaded) {
                status = await playNext(context.playbackObj, audio.uri)
            } else {
                status = await play(context.playbackObj, audio.uri)
            }
        }

        context.updateState(context, {
            playbackObj: context.playbackObj,
            soundObj: status,
            currentAudio: audio,
            isPlaying: true,
            currentAudioIndex: index,
            playbackPosition: null,
            playbackDuration: null
        })
        storeAudioForNextOpening(audio, index)
    }

    const handlePrevious = async () => {
        const { isLoaded } = await context.playbackObj.getStatusAsync()
        const isFirstAudio = context.currentAudioIndex <= 0
        let audio = context.audioFiles[context.currentAudioIndex - 1]
        let index
        let status

        if (!isLoaded && !isFirstAudio) {
            index = context.currentAudioIndex - 1
            status = await play(context.playbackObj, audio.uri)
        }
        if (isLoaded && !isFirstAudio) {
            index = context.currentAudioIndex - 1
            status = await playNext(context.playbackObj, audio.uri)
        }
        if (isFirstAudio) {
            index = context.totalAudioCount - 1
            audio = context.audioFiles[index]
            if (isLoaded) {
                status = await playNext(context.playbackObj, audio.uri)
            } else {
                status = await play(context.playbackObj, audio.uri)
            }
        }

        context.updateState(context, {
            playbackObj: context.playbackObj,
            soundObj: status,
            currentAudio: audio,
            isPlaying: true,
            currentAudioIndex: index,
            playbackPosition: null,
            playbackDuration: null
        })
        storeAudioForNextOpening(audio, index)
    }

    useEffect(() => {
        context.loadPreviousAudio()
        context.loadPreviousTheme()
    }, [])


    if (!context.currentAudio) return null
    return (
        <View style={styles.container}>
            {/* <Text style={styles.audioCont}>{`${context.currentAudioIndex + 1} / ${context.totalAudioCount}`}</Text> */}
            <View style={{ alignItems: 'flex-end', justifyContent: 'flex-end', zIndex: 1 }}>
                <TouchableOpacity style={styles.dotsTouchCont} onPress={() => {
                    setOptionModalVisible(true)
                }}>
                    <MaterialCommunityIcons name="dots-horizontal" size={25} color={context.backgroundImg === 'BackImgBlur' ? COLOR_PRIMARY : COLOR_QUATERNARY} />
                </TouchableOpacity>
            </View>
            {context.backgroundImg === 'BackImgBlur' && (
                <BackgroundImgPlayerBlur isPlayPause={context.isPlaying} isVisible={context.backgroundImg} />
            )}
            {context.backgroundImg === 'BackImgColors' && (
                <BackgroundImageColors />
            )}
            {context.backgroundImg === 'BackImgFilter' && (
                <BackgroundImageFilter />
            )}
            <View style={styles.audioPlayerCont}>
                <Text style={[styles.audioTitle, { color: context.backgroundImg === 'BackImgBlur' ? COLOR_PRIMARY : COLOR_QUATERNARY }]} numberOfLines={1}>{getFilename(context.currentAudio.filename)}</Text>
                <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={1}
                    value={calculateSeebBar()}
                    minimumTrackTintColor={context.backgroundImg === 'BackImgBlur' ? 'rgba(56, 77, 94, .8)' : COLOR_QUATERNARY}
                    maximumTrackTintColor={context.backgroundImg === 'BackImgBlur' ? 'rgba(56, 77, 94, 1)' : COLOR_QUATERNARY}
                    thumbTintColor={context.backgroundImg === 'BackImgBlur' ? COLOR_PRIMARY : COLOR_QUATERNARY}
                />
                <View style={styles.audioControllers}>
                    <PlayerButtton iconType={'prev'} size={27} onPressButton={handlePrevious} isColor={context.backgroundImg} />
                    <PlayerButtton iconType={context.isPlaying ? 'play' : 'pause'} size={50} onPressButton={handlePlayPause} isColor={context.backgroundImg} />
                    <PlayerButtton iconType={'next'} size={27} onPressButton={handleNext} isColor={context.backgroundImg} />
                </View>
            </View>
            <OptionsModal
                visible={optionModalVisible}
                onCloseModal={() => { setOptionModalVisible(false) }}
                currentItem={context.currentAudio}
                onBackImgBlurPress={() => {
                    context.updateState(context, { backgroundImg: 'BackImgBlur' })
                    storeThemeBackgroundImgPlayer('BackImgBlur')
                    setOptionModalVisible(false)
                }}
                onBackImgColorsPress={() => {
                    context.updateState(context, { backgroundImg: 'BackImgColors' })
                    storeThemeBackgroundImgPlayer('BackImgColors')
                    setOptionModalVisible(false)
                }}
                onBackImgFilterPress={() => {
                    context.updateState(context, { backgroundImg: 'BackImgFilter' })
                    storeThemeBackgroundImgPlayer('BackImgFilter')
                    setOptionModalVisible(false)
                }}
            />
        </View>
    );
}

export default Player