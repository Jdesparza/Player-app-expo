import { StyleSheet, StatusBar, Platform, Dimensions } from 'react-native';
import { COLOR_PRIMARY, COLOR_QUATERNARY, COLOR_SECONDARY, COLOR_TERTIARY } from '../../utils/paleta';

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: 'rgba(250,250,250,1)'
    },
    playListBanner: {
        padding: 10,
        marginVertical: 5,
        backgroundColor: COLOR_QUATERNARY,
        borderRadius: 5,
        elevation: 1.5
    },
    titleList: {
        fontSize: 16,
        color: COLOR_PRIMARY,
        fontWeight: '600',
        letterSpacing: .5
    },
    audioCount: {
        marginTop: 5,
        opacity: 0.5,
        fontSize: 14,
    },
    playListBtn: {
        color: COLOR_PRIMARY,
        letterSpacing: 1,
        fontWeight: '600',
        fontSize: 14,
        paddingHorizontal: 5
    }
})

export default styles;