import AsyncStorage from "@react-native-async-storage/async-storage"

export const storeAudioForNextOpening = async (audio, index, lastPosition, lastDuration) => {
    await AsyncStorage.setItem('previousAudio', JSON.stringify({ audio: { ...audio, lastPosition, lastDuration }, index }))
}

export const storeThemeBackgroundImgPlayer = async (theme) => {
    await AsyncStorage.setItem('previousTheme', JSON.stringify({ theme }))
}

export const convertTime = minutes => {
    if (minutes) {
        const hrs = minutes / 60
        let minute = hrs.toString().split('.')[0]
        const percent = parseInt(hrs.toString().split('.')[1].slice(0, 2))
        const sec = Math.ceil((60 * percent) / 100)

        if (parseInt(minute) < 10 && sec < 10) {
            return `0${minute}:0${sec}`
        }

        if (sec == 60) {
            return `0${parseInt(minute) + 1}:00`
        }

        if (parseInt(minute) < 10) {
            return `0${minute}:${sec}`
        }

        if (sec < 10) {
            return `${minute}:0${sec}`
        }

        return `${minute}:${sec}`
    }
}
