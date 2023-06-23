import React, { useContext, useState, useEffect } from "react";
import { Image, Text, View, Button, SafeAreaView, TouchableOpacity } from "react-native";
import BackgroundImgPlayerBlur from "../../components/BackgroundImgPlayerBlur";
import styles from "./styles";

import Slider from '@react-native-community/slider';
import { COLOR_PRIMARY, COLOR_QUATERNARY } from "../../utils/paleta";
import PlayerButtton from "../../components/PlayerButton";
import { AudioContext } from "../../context/AudioProvider";
import { changeAudio, moveAudio, pause, play, playNext, resume, selectAudio } from "../../misc/audioController";
import { convertTime, storeAudioForNextOpening, storeThemeBackgroundImgPlayer } from "../../misc/helper";
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
    const [currentPosition, setCurrentPosition] = useState(0)

    const { playbackPosition, playbackDuration, currentAudio } = context

    const calculateSeebBar = () => {
        if (playbackPosition !== null && playbackDuration !== null) {
            return playbackPosition / playbackDuration
        }

        if (currentAudio.lastPosition) {
            return currentAudio.lastPosition / (currentAudio.lastDuration)
        }

        return 0
    }

    const handlePlayPause = async () => {
        await selectAudio(context.currentAudio, context)
    }

    const handleNext = async () => {
        await changeAudio(context, 'next')
    }

    const handlePrevious = async () => {
        await changeAudio(context, 'previous')
    }

    const renderCurrentTime = () => {
        if (!context.soundObj && currentAudio.lastPosition) {
            return convertTime(currentAudio.lastPosition / 1000)
        }
        return convertTime(playbackPosition / 1000)
    }

    useEffect(() => {
        context.loadPreviousAudio()
        context.loadPreviousTheme()
    }, [])


    if (!currentAudio) return null
    return (
        <View style={styles.container}>
            {/* <Text style={styles.audioCont}>{`${context.currentAudioIndex + 1} / ${context.totalAudioCount}`}</Text> */}
            <View style={styles.infoContainer(context.isPlayListRunning)}>
                {context.isPlayListRunning && (
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', opacity: .8 }}>
                        <Text style={{
                            color: context.backgroundImg === 'BackImgBlur' ? COLOR_PRIMARY : COLOR_QUATERNARY,
                            fontSize: 14,
                            fontWeight: '500',
                            letterSpacing: 1
                        }}>PlayList: </Text>
                        <Text style={{
                            color: context.backgroundImg === 'BackImgBlur' ? COLOR_PRIMARY : COLOR_QUATERNARY,
                            fontSize: 13,
                        }}>{context.activePlayList.title}</Text>
                    </View>
                )}
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
                <Text style={[styles.audioTitle, { color: context.backgroundImg === 'BackImgBlur' ? COLOR_PRIMARY : COLOR_QUATERNARY }]} numberOfLines={1}>
                    {getFilename(currentAudio.filename)}
                </Text>
                <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={1}
                    value={calculateSeebBar()}
                    minimumTrackTintColor={context.backgroundImg === 'BackImgBlur' ? 'rgba(56, 77, 94, .8)' : COLOR_QUATERNARY}
                    maximumTrackTintColor={context.backgroundImg === 'BackImgBlur' ? 'rgba(56, 77, 94, 1)' : COLOR_QUATERNARY}
                    thumbTintColor={context.backgroundImg === 'BackImgBlur' ? COLOR_PRIMARY : COLOR_QUATERNARY}
                    onValueChange={(value) => {
                        setCurrentPosition(convertTime(value * (playbackDuration / 1000)))
                    }}
                    onSlidingStart={async () => {
                        if (!context.isPlaying) return;

                        try {
                            await pause(context.playbackObj)
                        } catch (error) {
                            console.log('error inside onSlidingStart callback', error)
                        }
                    }}
                    onSlidingComplete={async value => {
                        await moveAudio(context, value)
                        setTimeout(() => {
                            setCurrentPosition(0)
                        }, 1);
                    }}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={[styles.audioTime, { color: context.backgroundImg === 'BackImgBlur' ? COLOR_PRIMARY : COLOR_QUATERNARY }]}>
                        {currentPosition ? currentPosition : renderCurrentTime()}
                    </Text>
                    <Text style={[styles.audioTime, { color: context.backgroundImg === 'BackImgBlur' ? COLOR_PRIMARY : COLOR_QUATERNARY }]}>
                        {convertTime(currentAudio.lastDuration ? (currentAudio.lastDuration / 1000) : (playbackDuration / 1000))}
                    </Text>
                </View>
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
            />
        </View>
    );
}

export default Player