import { View, Text, Image, Platform, Animated, Easing } from 'react-native'
import React, { useEffect, useRef, useState, useContext } from 'react'

import { BlurView } from 'expo-blur';
import styles from './styles';
import { LinearGradient } from 'expo-linear-gradient';
import { AudioContext } from '../../context/AudioProvider';

const imageUri = require('../../../assets/images/umbrella-nightcore.jpg')

const BackgroundImgPlayerBlur = ({ isPlayPause }) => {

    const [isAnimating, setIsAnimating] = useState(false);
    const [isStopAnim, setIsStopAnim] = useState(false)

    const rotationValue = useRef(new Animated.Value(0)).current;
    const isOpacityAnimation = useRef(new Animated.Value(0.7)).current
    const isScaleAnimation = useRef(new Animated.Value(0.8)).current

    useEffect(() => {
        let rotationAnimation;

        if (!isAnimating) setIsStopAnim(false)

        if (isPlayPause && !isStopAnim) {
            rotationAnimation = AnimRotate(1, 10000, Easing.linear)
            AnimOpacity(1, 1000)
            AnimScale(1, 1000)
        } else {
            AnimOpacity(0.7, 3500)
            AnimScale(0.8, 3500)
        }

        if (rotationAnimation && !isStopAnim) {
            setIsAnimating(true);
            Animated.loop(rotationAnimation).start(
                console.log('anim')
            )
        } else {
            if (isAnimating) {
                AnimRotate(0, 3500, Easing.in(Easing.bounce)).start(({ finished }) => {
                    setIsStopAnim(true)
                    if (finished) {
                        setIsAnimating(false);
                        setIsStopAnim(false)
                        console.log('animation ended!')
                    }
                })
            }
        }

        return () => {
            rotationValue.stopAnimation();
            isOpacityAnimation.stopAnimation();
            isScaleAnimation.stopAnimation();
        };
    }, [isPlayPause, isStopAnim]);


    const AnimRotate = (value, duration, easing) => {
        return Animated.timing(rotationValue, {
            toValue: value,
            duration: duration,
            easing: easing,
            useNativeDriver: true,
        });
    }

    const AnimOpacity = (value, duration) => {
        return Animated.timing(isOpacityAnimation, {
            toValue: value,
            duration: duration,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start();
    }

    const AnimScale = (value, duration) => {
        return Animated.timing(isScaleAnimation, {
            toValue: value,
            duration: duration,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start();
    }

    const interpolatedRotation = rotationValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <Animated.View style={[styles.container(isPlayPause), { transform: [{ scale: isScaleAnimation }], opacity: isOpacityAnimation }]}>
            <Animated.Image style={[styles.image, { transform: [{ rotate: interpolatedRotation }] }]} source={imageUri} blurRadius={0} />
            <Animated.View style={[styles.boxCont, { transform: [{ rotate: interpolatedRotation }] }]}>
                <View style={styles.boxWithShadow} />
            </Animated.View>

            {Platform.OS === 'ios' && (
                <>
                    <BlurView style={styles.blurContainer} intensity={15} tint='light' />
                </>
            )}
            {Platform.OS === 'android' && (
                <>
                    <Animated.Image style={[styles.blurContainer, { transform: [{ rotate: interpolatedRotation }] }]} source={imageUri} blurRadius={15} />
                </>
            )}
        </Animated.View>
    )
}

export default BackgroundImgPlayerBlur