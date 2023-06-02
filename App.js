import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { NavigationContainer } from '@react-navigation/native'
import AudioProvider from './src/context/AudioProvider';

export default function App() {
  return (
    <>
      <AudioProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </AudioProvider>
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({

});
