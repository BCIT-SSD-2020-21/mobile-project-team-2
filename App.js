import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Platform, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './src/components/navigation/BottomTabNavigator';
import DrawerNavigator from './src/components/navigation/DrawerNavigator';

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