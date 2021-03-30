import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Platform, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './src/components/navigation/BottomTabNavigator';
import DrawerNavigator from './src/components/navigation/DrawerNavigator';


import * as firebase from 'firebase'

  var firebaseConfig = {
    apiKey: "AIzaSyDFxRRPqBUNisZNWGbNszkMikswNTsjvbw",
    authDomain: "realstock-4e514.firebaseapp.com",
    projectId: "realstock-4e514",
    storageBucket: "realstock-4e514.appspot.com",
    messagingSenderId: "710212979677",
    appId: "1:710212979677:web:f23259bc5f2bb0d317c434"
  };
 

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