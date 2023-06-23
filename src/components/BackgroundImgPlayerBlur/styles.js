import { StyleSheet, StatusBar, Platform, Dimensions } from 'react-native';
import { COLOR_PRIMARY, COLOR_QUATERNARY, COLOR_QUINARY, COLOR_SECONDARY, COLOR_TERTIARY } from '../../utils/paleta';
import color from '../../misc/color';

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
    container: (isPlayPause) => ({
        // flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'green',
        // opacity: isPlayPause ? 1 : 0.8,
        // transform: [{ scale: isPlayPause ? 1 : .8 }],
        position: 'absolute',
        top: (height - width - 15 - 180 - 45 - 10) / 2.5,
        left: 0,
        right: 0,
        bottom: 180,
        zIndex: 0
    }),
    image: {
        width: width - 40,
        height: width - 40,
        borderRadius: width - 40,
        resizeMode: 'cover',
        zIndex: 2
    },
    boxCont: {
        width: width - 20,
        height: width - 20,
        borderRadius: width - 20,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 7,
        zIndex: 1,
        position: 'absolute'
    },
    boxWithShadow: {
        width: '100%',
        height: '100%',
        bottom: 3,
        borderRadius: width - 20,
        shadowColor: COLOR_QUINARY, //rgba(255, 255, 255, .7)  rgba(92, 29, 209, 1) rgba(92, 29, 209, .9)
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.46,
        shadowRadius: 11.14,
        elevation: 14,
    },
    blurContainer: {
        position: 'absolute',
        // top: 0,
        // left: 0,
        // bottom: 0,
        // right: 0,
        width: width - 25,
        height: width - 25,
        borderRadius: width - 25,
        zIndex: 0
    },
})

export default styles;