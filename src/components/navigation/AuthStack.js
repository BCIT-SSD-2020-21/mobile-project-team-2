import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { EvilIcons } from '@expo/vector-icons';

const BottomTab = createBottomTabNavigator();

export default function AuthStack() {
    return (
        <BottomTab.Navigator initialRouteName= {"Login"}>

            <BottomTab.Screen
                name={"Login"}
                component={LoginScreenNavigator}
                options={{
                    tabBarIcon: () => <EvilIcons name="star" size={30} color="black" />,
                }}
            />
            <BottomTab.Screen
                name={"Register"}
                component={RegisterScreenNavigator}
                options={{
                    tabBarIcon: () => <EvilIcons name="star" size={30} color="black" />,
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
		<LoginScreenStack.Navigator>
			<LoginScreenStack.Screen
				name="Login"
				component={Login}
				options={{ headerTitle: 'Login Screen' }}
			/>
		</LoginScreenStack.Navigator>
	);
}

const RegisterScreenStack = createStackNavigator();
function RegisterScreenNavigator() {
	return (
		<RegisterScreenStack.Navigator>
			<RegisterScreenStack.Screen
				name="Register"
				component={Register}
				options={{ headerTitle: 'Register Screen' }}
			/>
		</RegisterScreenStack.Navigator>
	);
}


