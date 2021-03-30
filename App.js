import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Platform, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './src/components/navigation/BottomTabNavigator';
import DrawerNavigator from './src/components/navigation/DrawerNavigator';
import * as firebase from 'firebase'
import config from './config'


const firebaseConfig = {
    apiKey: config.firebaseConfig.APIKEY,
    authDomain: config.firebaseConfig.AUTHDOMAIN,
    projectId: config.firebaseConfig.PROJECTID,
    storageBucket: config.firebaseConfig.STORAGEBUCKET,
    messagingSenderId: config.firebaseConfig.MESSAGINGSENDERID,
    appId: config.firebaseConfig.APPID,
}
 

  if(firebase.apps.length === 0) {
	  firebase.initializeApp(firebaseConfig)
  }
  
const Stack = createStackNavigator();

// const PlatformNavigator = Platform.select({
// 	ios: () => BottomTabNavigator,
// 	android: () => DrawerNavigator,
// })();

export default function App() {
  return (
    <SafeAreaProvider>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Root" component={BottomTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  </SafeAreaProvider>
  );
}