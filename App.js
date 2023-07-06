import { StyleSheet, Text, View, SafeAreaView, Platform } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { NavigationContainer } from '@react-navigation/native'
import AudioProvider from './src/context/AudioProvider';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

export default function App() {

  return (
    <>
      <StatusBar style="transparent" translucent={true} />
      <AudioProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </AudioProvider>
    </>
  );
}

const styles = StyleSheet.create({

});
