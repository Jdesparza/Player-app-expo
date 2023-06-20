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
        fontSize: 20,
        fontWeight: '600',
        padding: 20,
        paddingBottom: 0,
        color: COLOR_PRIMARY
    },
    optionCont: {
        padding: 20,
    },
    BackContainerImg: {
        borderBottomWidth: 1,
        borderBottomColor: '#e2e2e2',
        paddingBottom: 5
    },
    BackImgTitle: {
        fontSize: 18,
        fontWeight: '500',
        color: color.FONT,
        paddingVertical: 10,
        letterSpacing: 1,
    },
    BackImgTouch: {
        paddingHorizontal: 7,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    optionTheme: (backgroundImg, theme) => ({
        textAlign: 'center',
        backgroundColor: backgroundImg === theme ? COLOR_PRIMARY : 'transparent',
        borderRadius: backgroundImg === theme ? 10 : 0,
        borderWidth: backgroundImg === theme ? 1 : 0,
        borderColor: backgroundImg === theme ? '#d4deff' : 'transparent',
        color: backgroundImg === theme ? 'white' : color.FONT
    }),
    option: {
        fontSize: 16,
        fontWeight: '500',
        color: color.FONT,
        paddingVertical: 10,
        letterSpacing: 1,
        // backgroundColor: 'green',
        minWidth: 95
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