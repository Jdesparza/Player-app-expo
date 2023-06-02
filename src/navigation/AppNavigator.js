import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ListMusic from '../screens/ListMusic'
import Player from '../screens/Player'
import PlayList from '../screens/PlayList'

import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator()

const AppNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name='ListMusic' component={ListMusic} options={{
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="headset" size={size} color={color} />
                )
            }} />
            <Tab.Screen name='Player' component={Player} options={{
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="musical-notes" size={size} color={color} />
                )
            }} />
            <Tab.Screen name='PlayList' component={PlayList} options={{
                tabBarIcon: ({ color, size }) => (
                    <MaterialIcons name="library-music" size={size} color={color} />
                )
            }} />
        </Tab.Navigator>
    )
}

export default AppNavigator

const styles = StyleSheet.create({})