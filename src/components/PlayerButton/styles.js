import { StyleSheet, StatusBar, Platform, Dimensions } from 'react-native';
import { COLOR_PRIMARY, COLOR_QUATERNARY, COLOR_SECONDARY, COLOR_TERTIARY } from '../../utils/paleta';

const { width, height } = Dimensions.get('window')

const Height_Card = 55

const styles = StyleSheet.create({
    iconStyle: {
        // backgroundColor: 'green',
        padding: 5,
        borderRadius: width
    }
})

export default styles;