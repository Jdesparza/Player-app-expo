import AsyncStorage from "@react-native-async-storage/async-storage"

export const storeAudioForNextOpening = async (audio, index) => {
    await AsyncStorage.setItem('previousAudio', JSON.stringify({ audio, index }))
}

export const storeThemeBackgroundImgPlayer = async (theme) => {
    await AsyncStorage.setItem('previousTheme', JSON.stringify({ theme }))
}
