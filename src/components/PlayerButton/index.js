import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import { COLOR_PRIMARY, COLOR_QUATERNARY } from '../../utils/paleta'
import styles from './styles'

const PlayerButtton = (props) => {

    const { iconType, size, isColor, onPressButton } = props

    const getIconName = (type) => {
        switch (type) {
            case 'play':
                return 'pausecircle' // to pay
            case 'pause':
                return 'play' // to pause
            case 'next':
                return 'fastforward' // to next audio
            case 'prev':
                return 'fastbackward' // to previous audio banckward
        }
    }

    return (
        <TouchableOpacity style={styles.iconStyle} onPress={onPressButton} >
            <AntDesign name={getIconName(iconType)} size={size} color={isColor === 'BackImgBlur' ? COLOR_PRIMARY : COLOR_QUATERNARY} />
        </TouchableOpacity>
    )
}

export default PlayerButtton