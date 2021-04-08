import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { EvilIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const BottomTab = createBottomTabNavigator();

export default function AuthStack() {
    return (
        <BottomTab.Navigator initialRouteName={"Login"} tabBarOptions={{ style: { backgroundColor: '#041529', borderTopWidth: 0}}}>
            <BottomTab.Screen
                name={"Login"}
                component={LoginScreenNavigator}
                options={{
                    tabBarIcon: () => <AntDesign name="login" size={30} color="#cbdae4" />,
                }}
            />
            <BottomTab.Screen
                name={"Register"}
                component={RegisterScreenNavigator}
                options={{
                    tabBarIcon: () => <MaterialCommunityIcons name="pen-plus" size={24} color="#cbdae4" />,
                }}
            />
        </BottomTab.Navigator>
    )
}

import { createStackNavigator } from '@react-navigation/stack';
import Register from '../../screens/Register';
import Login from '../../screens/Login';

const LoginScreenStack = createStackNavigator();
function LoginScreenNavigator() {
	return (
		<LoginScreenStack.Navigator screenOptions={{
            headerShown: false
          }}>
			<LoginScreenStack.Screen
				name="Login"
				component={Login}
				//options={{ headerTitle: 'Login Screen' }}
			/>
		</LoginScreenStack.Navigator>
	);
}

const RegisterScreenStack = createStackNavigator();
function RegisterScreenNavigator() {
	return (
		<RegisterScreenStack.Navigator  screenOptions={{
            headerShown: false
          }}>
			<RegisterScreenStack.Screen
				name="Register"
				component={Register}
				//options={{ headerTitle: 'Register Screen' }}
			/>
		</RegisterScreenStack.Navigator>
	);
}


