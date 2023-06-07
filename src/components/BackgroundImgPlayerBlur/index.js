import { View, Text, Image, Platform } from 'react-native'
import React from 'react'

import { BlurView } from 'expo-blur';
import styles from './styles';
import { LinearGradient } from 'expo-linear-gradient';

const imageUri = require('../../../assets/images/gamma_6_-cR_HgXp3k-transformed.png')

const BackgroundImgPlayerBlur = () => {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={imageUri} blurRadius={0} />
            <View style={styles.boxCont}>
                <View style={styles.boxWithShadow} />
            </View>

            {Platform.OS === 'ios' && (
                <>
                    <BlurView style={styles.blurContainer} intensity={15} tint='light' />
                </>
            )}
            {Platform.OS === 'android' && (
                <>
                    <Image style={styles.blurContainer} source={imageUri} blurRadius={15} />
                </>
            )}
        </View>
    )
}

export default BackgroundImgPlayerBlur