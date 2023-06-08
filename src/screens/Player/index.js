import react, { useContext, useState, useEffect } from "react";
import { Image, Text, View, Button } from "react-native";
import BackgroundImgPlayerBlur from "../../components/BackgroundImgPlayerBlur";
import styles from "./styles";

import Slider from '@react-native-community/slider';
import { COLOR_PRIMARY } from "../../utils/paleta";
import PlayerButtton from "../../components/PlayerButton";
import { AudioContext } from "../../context/AudioProvider";
import { pause, play, playNext, resume } from "../../misc/audioController";
import { storeAudioForNextOpening } from "../../misc/helper";

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
    }, [])


    if (!context.currentAudio) return null
    return (
        <View style={styles.container}>
            <Text style={styles.audioCont}>{`${context.currentAudioIndex + 1} / ${context.totalAudioCount}`}</Text>
            <BackgroundImgPlayerBlur otherStyle={{
                opacity: context.isPlaying ? 1 : 0.8,
                transform: [{ scale: context.isPlaying ? 1 : .8 }]
            }} />
            <View style={styles.audioPlayerCont}>
                <Text style={styles.audioTitle} numberOfLines={1}>{getFilename(context.currentAudio.filename)}</Text>
                <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={1}
                    value={calculateSeebBar()}
                    minimumTrackTintColor={'rgba(56, 77, 94, .8)'}
                    maximumTrackTintColor={'rgba(56, 77, 94, 1)'}
                    thumbTintColor={COLOR_PRIMARY}
                />
                <View style={styles.audioControllers}>
                    <PlayerButtton iconType={'prev'} size={27} onPressButton={handlePrevious} />
                    <PlayerButtton iconType={context.isPlaying ? 'play' : 'pause'} size={50} onPressButton={handlePlayPause} />
                    <PlayerButtton iconType={'next'} size={27} onPressButton={handleNext} />
                </View>
            </View>
        </View>
    );
}

export default Player