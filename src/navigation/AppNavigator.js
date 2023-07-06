import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ListMusic from '../screens/ListMusic'
import Player from '../screens/Player'
import PlayList from '../screens/PlayList'

import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { COLOR_PRIMARY, COLOR_TERTIARY } from '../utils/paleta'
import { AudioContext } from '../context/AudioProvider'

const Tab = createBottomTabNavigator()

const AppNavigator = () => {

    const { isScreen, backgroundImg } = useContext(AudioContext)
    const [colorNav, setColorNav] = useState(null)

    useEffect(() => {
        // console.log(isScreen)
        if (isScreen && backgroundImg !== 'BackImgBlur') {
            setColorNav('white')
        } else {
            setColorNav(COLOR_PRIMARY)
        }
    }, [isScreen, backgroundImg])


    return (
        <Tab.Navigator screenOptions={{
            tabBarStyle: {
                position: 'absolute',
                bottom: 0,
                height: 50,
                backgroundColor: 'transparent',
                elevation: 0,
                borderTopColor: 'rgba(230, 230, 230, 1)',
                borderTopWidth: isScreen ? 0 : 1
            },
            tabBarActiveTintColor: colorNav,
            tabBarShowLabel: false,
        }}
        >
            <Tab.Screen name='ListMusic' component={ListMusic} options={{
                tabBarIcon: ({ color, size }) => (
                    <View style={styles.viewIcon}>
                        <Ionicons name="headset" size={size} color={color} style={styles.icon} />
                        {(color === COLOR_PRIMARY || color === 'white') && <Text style={styles.textIcon(color)}>.</Text>}
                    </View>
                )
            }} />
            <Tab.Screen name='Player' component={Player} options={{
                tabBarIcon: ({ color, size }) => (
                    <View style={styles.viewIcon}>
                        <Ionicons name="musical-notes" size={size} color={color} style={styles.icon} />
                        {(color === COLOR_PRIMARY || color === 'white') && <Text style={styles.textIcon(color)}>.</Text>}
                    </View>
                ),
                headerShown: false
            }} />
            <Tab.Screen name='PlayList' component={PlayList} options={{
                tabBarIcon: ({ color, size }) => (
                    <View style={styles.viewIcon}>
                        <MaterialIcons name="library-music" size={size} color={color} style={styles.icon} />
                        {(color === COLOR_PRIMARY || color === 'white') && <Text style={styles.textIcon(color)}>.</Text>}
                    </View>
                ),
            }} />
        </Tab.Navigator>
    )
}

export default AppNavigator

const styles = StyleSheet.create({
    viewIcon: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        marginBottom: 10
    },
    textIcon: (color) => ({
        color,
        fontSize: 20,
        fontWeight: 'bold',
        bottom: -5,
        position: 'absolute',

    })
})