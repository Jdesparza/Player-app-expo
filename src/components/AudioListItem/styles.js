import { StyleSheet, StatusBar, Platform, Dimensions } from 'react-native';
import { COLOR_PRIMARY, COLOR_QUATERNARY, COLOR_SECONDARY, COLOR_TERTIARY } from '../../utils/paleta';

const { width, height } = Dimensions.get('window')

const Height_Card = 55

const styles = StyleSheet.create({
    container: (activeListItem, isPlaying) => ({
        flexDirection: 'row',
        alignSelf: 'center',
        width: width - 20,
        height: Height_Card,
        backgroundColor: activeListItem ? COLOR_PRIMARY : COLOR_QUATERNARY,
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
    imgCont: {
        width: Height_Card,
        height: Height_Card,
    },
    imgAudio: {
        width: '100%',
        height: '100%',
        borderRadius: Height_Card,
        resizeMode: 'cover'
    },
    imgAudioPlay: (isPlaying) => ({
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000,
        opacity: isPlaying ? 1 : .9,
        backgroundColor: isPlaying ? 'rgba(0, 0, 0, .1)' : 'rgba(0, 0, 0, .5)'
    }),
    infoAudio: {
        flex: 1,
        height: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 6.5
    },
    filenameAudio: (activeListItem, isPlaying) => ({
        color: activeListItem ? 'white' : COLOR_PRIMARY,
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