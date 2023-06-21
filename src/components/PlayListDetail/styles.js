import { StyleSheet, StatusBar, Platform, Dimensions } from 'react-native';
import { COLOR_PRIMARY, COLOR_QUATERNARY, COLOR_QUINARY, COLOR_SECONDARY, COLOR_TERTIARY } from '../../utils/paleta';
import color from '../../misc/color';

const { width, height } = Dimensions.get('window')

export default styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center',
        maxHeight: height - 150,
        minHeight: 300,
        width: width - 15,
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
        paddingVertical: 10,
        fontWeight: '600',
        color: COLOR_QUINARY,
    },
    listContainer: {
        padding: 5,
    },


    modalBG: {
        backgroundColor: color.MODAL_BG,
        zIndex: -1
    }
})