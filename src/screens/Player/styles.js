import { StyleSheet, StatusBar, Platform, Dimensions } from 'react-native';
import { COLOR_PRIMARY, COLOR_QUATERNARY, COLOR_SECONDARY, COLOR_TERTIARY } from '../../utils/paleta';
import color from '../../misc/color';

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginTop: StatusBar.currentHeight,
        // backgroundColor: 'red'
        // justifyContent: 'center',
        // alignItems: 'center'
    },
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
        marginHorizontal: 10,
        marginVertical: 5,
        // backgroundColor: 'yellow',
        justifyContent: 'center',
        alignItems: 'center'
    },
    audioPlayerCont: {
        // flex: 1,
        width,
        // height: 170,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        // padding: 10,
        // backgroundColor: '#50aaea',
        // paddingTop: 20
    },
    audioTitle: {
        fontSize: 16,
        padding: 15
    },
    slider: {
        width: width,
        height: 30,
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