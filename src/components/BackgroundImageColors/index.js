import { View, Text, Image } from 'react-native'
import React, { useState, useEffect } from 'react'

import ImageColors from 'react-native-image-colors'
import { LinearGradient } from 'expo-linear-gradient'
import styles from './styles';

const imageUri = require('../../../assets/images/umbrella-nightcore.jpg')

const BackgroundImageColors = () => {

    const [colors, setColors] = useState({})
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        ImageColors.getColors(imageUri, {
            fallback: '#000000',
            quality: 'low',
        }).then(colors => {
            // console.log(colors)
            setColors(colors)
            setLoaded(true)
        });
    }, [imageUri]);

    return (
        <>
            {loaded && <View
                style={styles.container}
            >
                <LinearGradient
                    colors={[
                        colors.average != '#000000' ? colors.average : '#353540', // colors.vibrant != '#000000' ? colors.vibrant : colors.average,
                        'transparent',
                        'transparent',
                        colors.average != '#000000' ? colors.average : '#353540',
                    ]}
                    locations={[0.15, 0.21, 0.545, 0.61]}
                    style={styles.gradientImg}
                />
                <Image source={imageUri} style={styles.image} />
            </View>}
        </>
    )
}

export default BackgroundImageColors