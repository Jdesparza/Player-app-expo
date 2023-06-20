import { StyleSheet, StatusBar, Platform, Dimensions } from 'react-native';
import { COLOR_PRIMARY, COLOR_QUATERNARY, COLOR_SECONDARY, COLOR_TERTIARY } from '../../utils/paleta';

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0
    },
    gradientImg: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100
    },
    image: {
        width,
        height: width,
        marginBottom: width / 4,
    },
})

export default styles;