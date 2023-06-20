import { View, Text, ImageBackground, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './styles'
import { Grayscale } from 'react-native-color-matrix-image-filters'
import ImageColors from 'react-native-image-colors'

const imageUri = require('../../../assets/images/umbrella-nightcore.jpg')

const BackgroundImageFilter = () => {

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

    // {"average": "#79445A", "darkMuted": "#281828", "darkVibrant": "#682028", "dominant": "#281828", 
    // "lightMuted": "#C8A8B8", "lightVibrant": "#D86078", "muted": "#B86098", "platform": "android", "vibrant": "#E83068"}
    //.3 & blur 1.5

    return (
        <>
            {loaded && <View style={styles.container}>
                <Grayscale amount={.35} style={styles.grayscale}>
                    <Image source={imageUri} blurRadius={1.5} style={{ resizeMode: 'cover', width: '100%', height: '100%' }} />
                </Grayscale>
                <View style={styles.overlay} />
                <View style={[styles.contImage, { borderWidth: 3, borderColor: colors.vibrant }]}>
                    <Image source={imageUri} style={styles.image} />
                </View>
            </View>}
        </>
    )
}

export default BackgroundImageFilter