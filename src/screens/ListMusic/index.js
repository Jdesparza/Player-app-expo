import React, { Component, useState } from 'react'
import { Text, View, ScrollView, Dimensions } from 'react-native'
import styles from '../ListMusic/styles'
import { AudioContext } from '../../context/AudioProvider'
import { LayoutProvider, RecyclerListView } from 'recyclerlistview'
import AudioListItem from '../../components/AudioListItem'

export class ListMusic extends Component {

    static contextType = AudioContext

    constructor(props) {
        super(props)
        this.state = {
            isPlay: null,
        }
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

    rowRenderer = (type, item, index) => {

        return <AudioListItem item={item}
            onPlayAudioPress={
                () => console.log(item.filename, index)
            }
            onOptionPress={
                () => console.log(item.filename)
            } />
    }

    render() {
        return <AudioContext.Consumer>
            {({ dataProvider }) => {
                return (
                    <View style={{ flex: 1 }}>
                        <RecyclerListView
                            dataProvider={dataProvider}
                            layoutProvider={this.layoutProvider}
                            rowRenderer={this.rowRenderer}
                            scrollViewProps={{
                                showsVerticalScrollIndicator: false
                            }}
                        />
                    </View>
                )
            }}
        </AudioContext.Consumer>
    }
}

export default ListMusic
