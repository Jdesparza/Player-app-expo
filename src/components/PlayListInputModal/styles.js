import { StyleSheet, StatusBar, Platform, Dimensions } from 'react-native';
import { COLOR_PRIMARY, COLOR_QUATERNARY, COLOR_QUINARY, COLOR_SECONDARY, COLOR_TERTIARY } from '../../utils/paleta';
import color from '../../misc/color';

const { width, height } = Dimensions.get('window')

export default styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        width: width - 30,
        height: 200,
        borderRadius: 10,
        backgroundColor: color.ACTIVE_FONT,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleModal: {
        color: COLOR_QUINARY
    },
    input: {
        width: width - 60,
        borderBottomWidth: 1,
        borderBottomColor: COLOR_QUINARY,
        fontSize: 18,
        padding: 5
    },
    submitIcon: {
        padding: 10,
        backgroundColor: COLOR_QUINARY,
        borderRadius: 50,
        marginTop: 20
    },
    modalBG: {
        backgroundColor: color.MODAL_BG,
        zIndex: -1
    }
})