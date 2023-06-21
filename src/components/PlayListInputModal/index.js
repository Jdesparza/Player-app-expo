import { View, Text, Modal, TextInput, TouchableWithoutFeedback, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import styles from './styles'
import { AntDesign } from '@expo/vector-icons'

const PlayListInputModal = ({ visible, onClose, onSubmit }) => {

    const [playListName, setPlayListName] = useState('')

    const handleOnSubmit = () => {
        if (!playListName.trim()) {
            onClose()
        } else {
            onSubmit(playListName)
            setPlayListName('')
            onClose()
        }
    }

    return (
        <Modal visible={visible} animationType='fade' transparent>
            <View style={styles.modalContainer}>
                <View style={styles.inputContainer}>
                    <Text style={styles.titleModal}>Crear Lista de reproducción</Text>
                    <TextInput style={styles.input}
                        value={playListName} onChangeText={(text) => setPlayListName(text)}
                    />
                    <TouchableOpacity onPress={handleOnSubmit}>
                        <AntDesign name='check' size={24} color={'#fff'} style={styles.submitIcon} />
                    </TouchableOpacity>
                </View>
                <TouchableWithoutFeedback onPress={onClose}>
                    <View style={[StyleSheet.absoluteFillObject, styles.modalBG]} />
                </TouchableWithoutFeedback>
            </View>
        </Modal>
    )
}

export default PlayListInputModal