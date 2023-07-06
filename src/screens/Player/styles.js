import { StyleSheet, StatusBar, Platform, Dimensions } from 'react-native';
import { COLOR_PRIMARY, COLOR_QUATERNARY, COLOR_SECONDARY, COLOR_TERTIARY } from '../../utils/paleta';
import color from '../../misc/color';

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(250,250,250,1)',
        // marginTop: StatusBar.currentHeight,
        // backgroundColor: 'red'
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    infoContainer: (isPlayListRunning) => ({
        zIndex: 1,
        flexDirection: 'row',
        // backgroundColor: 'green',
        justifyContent: isPlayListRunning ? 'space-between' : 'flex-end',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5
    }),
    audioCont: {
        textAlign: 'right',
        paddingHorizontal: 15,
        paddingVertical: 10,
        justifyContent: 'center',
        color: color.FONT_LIGHT,
        // backgroundColor: 'yellow',
        zIndex: 1,
    },
    dotsTouchCont: {
        // alignItems: 'flex-end',
        paddingHorizontal: 5,
        paddingVertical: 5,
        // marginHorizontal: 10,
        // marginVertical: 5,
        // backgroundColor: 'yellow',
        justifyContent: 'center',
        alignItems: 'center'
    },
    audioPlayerCont: {
        // flex: 1,
        width,
        // height: 180,
        position: 'absolute',
        bottom: 50,
        left: 0,
        right: 0,
        // padding: 10,
        // backgroundColor: '#50aaea',
        // paddingTop: 20
    },
    audioTitle: {
        fontSize: 16,
        padding: 15,
        // backgroundColor: 'blue'
    },
    slider: {
        width: width,
        height: 30,
        // backgroundColor: 'red'
    },
    audioTime: {
        fontSize: 14,
        paddingHorizontal: 15,
        paddingBottom: 5,
        marginTop: -7,
        // backgroundColor: '#ff00d4'
    },
    audioControllers: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        // backgroundColor: '#9cff9c',
        padding: 10,
        zIndex: 1
    }
})

export default styles;