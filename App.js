import React, {useState, useEffect} from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthStack from './src/components/navigation/AuthStack';
import BottomTabNavigator from './src/components/navigation/BottomTabNavigator';
import DrawerNavigator from './src/components/navigation/DrawerNavigator';
import { firebase } from './src/firebase/config';
// import StockDetail from './src/screens/StockDetail'
import { Platform} from 'react-native';
import { LogBox } from 'react-native';

const Stack = createStackNavigator()

const AuthNavigator = Platform.select({
	ios: () => AuthStack,
	android: () => AuthStack,
})();

const PlatformNavigator = Platform.select({
	ios: () => BottomTabNavigator,
	android: () => DrawerNavigator //BottomTabNavigator
})()

export default function App() {

LogBox.ignoreLogs(['Setting a timer']);

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
        <Stack.Screen name="Root" component={user ? PlatformNavigator : AuthNavigator } />
      </Stack.Navigator>
    </NavigationContainer>
  </SafeAreaProvider>
  );
}
