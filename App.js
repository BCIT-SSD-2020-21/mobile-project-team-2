import React, {useState, useEffect} from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthStack from './src/components/navigation/AuthStack';
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
        <Stack.Screen name="Root" component={user ? BottomTabNavigator : AuthStack } />
      </Stack.Navigator>
    </NavigationContainer>
  </SafeAreaProvider>
  );
}