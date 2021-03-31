import React, {useState, useEffect} from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthStack from './src/components/navigation/AuthStack';
import BottomTabNavigator from './src/components/navigation/BottomTabNavigator';
import DrawerNavigator from './src/components/navigation/DrawerNavigator';
import { firebase } from './src/firebase/config';

const Stack = createStackNavigator();

const PlatformSpecificNavigator = Platform.select({
	ios: () => BottomTabNavigator,
	android: () => DrawerNavigator
})()

export default function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged((authUser) => {
      setUser(authUser);	 
    })
   return subscriber; // unsubscribe on unmount
  }, []);

  console.log("authUser", user)

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Root" component={PlatformSpecificNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}