import React, { Component, useState } from 'react'
import { Text, View, ScrollView, Dimensions, SafeAreaView } from 'react-native'
import styles from '../ListMusic/styles'
import { AudioContext } from '../../context/AudioProvider'
import { LayoutProvider, RecyclerListView } from 'recyclerlistview'
import AudioListItem from '../../components/AudioListItem'
import OptionsModal from '../../components/OptionsModal'
import { Audio } from 'expo-av'

export class ListMusic extends Component {

    static contextType = AudioContext

    constructor(props) {
        super(props)
        this.state = {
            playing: false,
            optionModalVisible: false,
            playbackObj: null,
            soundObj: null,
            currentAudio: {}
        }

        this.currentItem = {}
    }

    layoutProvider = new LayoutProvider((i) => 'audio', (type, dim) => {
        switch (type) {
            case 'audio':
                dim.width = Dimensions.get('window').width
                dim.height = 70
                break
            default:
                dim.width = 0
                dim.height = 0
        }
    })

    handleAudioPress = async (item) => {
        // playing audio for the first time
        if (this.state.soundObj === null) {
            const playbackObj = new Audio.Sound()
            const status = await playbackObj.loadAsync({ uri: item.uri }, { shouldPlay: true })
            return this.setState({ ...this.state, playbackObj: playbackObj, soundObj: status, currentAudio: item, playing: true })
        }

        // pause audio
        if (this.state.soundObj.isLoaded && this.state.soundObj.isPlaying) {
            const status = await this.state.playbackObj.setStatusAsync({ shouldPlay: false })
            return this.setState({ ...this.state, soundObj: status, playing: false })
        }

        // resume audio
        if (this.state.soundObj.isLoaded && !this.state.soundObj.isPlaying &&
            this.state.currentAudio.id === item.id) {
            const status = await this.state.playbackObj.playAsync()
            return this.setState({ ...this.state, soundObj: status, playing: true })
        }
    }

    rowRenderer = (type, item, index) => {

        return <AudioListItem item={item} isActivePlay={this.state.playing}
            onAudioPress={
                () => {
                    this.handleAudioPress(item)
                }
            }
            onOptionPress={
                () => {
                    this.currentItem = item
                    this.setState({ ...this.state, optionModalVisible: true })
                }
            } />
    }

    render() {
        return <AudioContext.Consumer>
            {({ dataProvider }) => {
                return (
                    <SafeAreaView style={{ flex: 1, backgroundColor: 'rgba(250,250,250,1)' }}>
                        <RecyclerListView
                            dataProvider={dataProvider}
                            layoutProvider={this.layoutProvider}
                            rowRenderer={this.rowRenderer}
                            scrollViewProps={{
                                showsVerticalScrollIndicator: false
                            }}
                        />
                        <OptionsModal
                            visible={this.state.optionModalVisible}
                            onCloseModal={() => this.setState({ ...this.state, optionModalVisible: false })}
                            currentItem={this.currentItem}
                            onPlayPress={() => console.log('playing audio')}
                            onPlayListPress={() => console.log('adding to the playlist')}
                        />
                    </SafeAreaView>
                )
            }}
        </AudioContext.Consumer>
    }
}

export default ListMusic
