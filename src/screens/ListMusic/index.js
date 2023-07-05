import React, { Component, useState } from 'react'
import { Text, View, ScrollView, Dimensions, SafeAreaView } from 'react-native'
import styles from '../ListMusic/styles'
import { AudioContext } from '../../context/AudioProvider'
import { LayoutProvider, RecyclerListView } from 'recyclerlistview'
import AudioListItem from '../../components/AudioListItem'
import OptionsModal from '../../components/OptionsModal'
import { Audio } from 'expo-av'
import { pause, play, playNext, resume, selectAudio } from '../../misc/audioController'
import { storeAudioForNextOpening } from '../../misc/helper'

export class ListMusic extends Component {

    static contextType = AudioContext

    constructor(props) {
        super(props)
        this.state = {
            playing: false,
            optionModalVisible: false,
        }

        this.currentItem = {}
    }

    layoutProvider = new LayoutProvider((i) => 'audio', (type, dim) => {
        switch (type) {
            case 'audio':
                dim.width = Dimensions.get('window').width
                dim.height = 65
                break
            default:
                dim.width = 0
                dim.height = 0
        }
    })

    handleAudioPress = async (item) => {
        if (this.context.currentAudio !== undefined && this.context.currentAudio.id === item.id) {
            await selectAudio({ ...item, lastPosition: this.context.currentAudio.lastPosition }, this.context)
        } else {
            await selectAudio(item, this.context)
        }
    }

    componentDidMount() {
        this.context.loadPreviousAudio()
        this.context.loadPreviousTheme()
    }

    rowRenderer = (type, item, index, extendedState) => {

        return <AudioListItem uri={item.uri} filename={item.filename} duration={item.duration} isPlaying={extendedState.isPlaying}
            activeListItem={this.context.currentAudioIndex === index}
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
            }
        />
    }

    render() {
        return <AudioContext.Consumer>
            {({ dataProvider, isPlaying }) => {
                if (!dataProvider._data.length) return null
                return (
                    <View style={{ flex: 1, backgroundColor: 'rgba(250,250,250,1)' }}>
                        <RecyclerListView
                            dataProvider={dataProvider}
                            layoutProvider={this.layoutProvider}
                            rowRenderer={this.rowRenderer}
                            extendedState={{ isPlaying }}
                            scrollViewProps={{
                                showsVerticalScrollIndicator: false
                            }}
                            style={{ paddingTop: 5 }}
                            renderFooter={() => <View style={{ paddingTop: 10 }} />}
                        />
                        <OptionsModal
                            visible={this.state.optionModalVisible}
                            onCloseModal={() => this.setState({ ...this.state, optionModalVisible: false })}
                            currentItem={this.currentItem}
                            options={[
                                { title: 'Play', onPress: () => console.log('playing audio') },
                                {
                                    title: 'Add to Playlist', onPress: () => {
                                        this.context.updateState(this.context, {
                                            addToPlayList: this.currentItem,
                                        })
                                        this.setState({ ...this.state, optionModalVisible: false })
                                        this.props.navigation.navigate('PlayList')
                                    }
                                }
                            ]}
                        />
                    </View>
                )
            }}
        </AudioContext.Consumer>
    }
}

export default ListMusic
