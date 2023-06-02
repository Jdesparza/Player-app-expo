import { StyleSheet, StatusBar, Platform, Dimensions } from 'react-native';
import { COLOR_PRIMARY, COLOR_QUATERNARY, COLOR_SECONDARY, COLOR_TERTIARY } from '../../utils/paleta';

const { width, height } = Dimensions.get('window')

const Height_Card = 55

const styles = StyleSheet.create({
    container: (isActivePlay) => ({
        flexDirection: 'row',
        alignSelf: 'center',
        width: width - 20,
        height: Height_Card,
        backgroundColor: isActivePlay ? COLOR_PRIMARY : COLOR_QUATERNARY,
        borderRadius: Height_Card,
        overflow: 'hidden',
        elevation: 3,
        marginTop: 7,
    }),
    leftCont: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
    imgCont: {},
    imgAudio: {
        width: Height_Card,
        height: '100%',
        borderRadius: Height_Card,
        resizeMode: 'cover'
    },
    imgAudioPlay: (isActivePlay) => ({
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
        opacity: isActivePlay ? 1 : 0
    }),
    infoAudio: {
        flex: 1,
        height: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 6.5
    },
    filenameAudio: (isActivePlay) => ({
        color: isActivePlay ? 'white' : COLOR_PRIMARY,
        fontSize: 15.5,
        fontWeight: '500'
    }),
    artistAudio: {
        color: COLOR_SECONDARY,
        fontSize: 13,
    },
    rightCont: {
        flexBasis: 40,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'yellow',
        paddingRight: 5
    }
})

export default styles;