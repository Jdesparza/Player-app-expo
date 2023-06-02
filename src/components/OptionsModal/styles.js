import { StyleSheet, StatusBar, Platform, Dimensions } from 'react-native';
import { COLOR_PRIMARY, COLOR_QUATERNARY, COLOR_SECONDARY, COLOR_TERTIARY } from '../../utils/paleta';
import color from '../../misc/color';

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
    modal: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: color.APP_BG,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        elevation: 5,
        // height: height / 2.5,
        zIndex: 1
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        padding: 20,
        paddingBottom: 0,
        color: color.FONT_MEDIUM
    },
    optionCont: {
        padding: 20,
    },
    option: {
        fontSize: 16,
        fontWeight: '500',
        color: color.FONT,
        paddingVertical: 10,
        letterSpacing: 1
    },
    modalBG: {
        position: 'absolute',
        backgroundColor: color.MODAL_BG,
        bottom: 0,
        left: 0,
        right: 0,
        top: 0
    }
})

export default styles;