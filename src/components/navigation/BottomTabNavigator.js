import React , {useState, useEffect} from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { EvilIcons } from '@expo/vector-icons';
import * as firebase from 'firebase'

const BottomTab = createBottomTabNavigator();
export default function BottomTabNavigator() {

	 const [user, setUser] = useState(null);

	 useEffect(() => {
		 const subscriber = firebase.auth().onAuthStateChanged((authUser) => {
			 setUser(authUser);	 
		 })

		return subscriber; // unsubscribe on unmount
	 }, []);

	 console.log("authUser", user)

    return (
        <BottomTab.Navigator initialRouteName= {"Market"}>
        {/* ScreenOne Stack */}

        <BottomTab.Screen
            name={user ? "Market" : "Login" }
            component={user ? MarketScreenNavigator : AuthScreenNavigator}
            options={{
                tabBarIcon: () => <EvilIcons name="star" size={30} color="black" />,
            }}
        />
        <BottomTab.Screen
            name="Portfolio"
            component={PortfolioScreenNavigator}
            options={{
                tabBarIcon: () => <EvilIcons name="star" size={30} color="black" />,
            }}
        />
        <BottomTab.Screen
            name="Search"
            component={SearchScreenNavigator}
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
import Market from '../../screens/Market';
import Portfolio from '../../screens/Portfolio';
// import Portfolio from '../../screens/Portfolio';
import Search from '../../screens/Search';

const AuthScreenStack = createStackNavigator();

function AuthScreenNavigator() {
	return (
		<AuthScreenStack.Navigator>
			
			<AuthScreenStack.Screen
				name="Login"
				component={Login}
				options={{ headerTitle: 'Login Screen' }}
			/>
			
			<AuthScreenStack.Screen
				name="Register"
				component={Register}
				options={{ headerTitle: 'Register Screen', headerBackTitle: "Back to Login" }}
			/>			
		</AuthScreenStack.Navigator>
	);
}

const MarketScreenStack = createStackNavigator();
function MarketScreenNavigator() {
	return (
		<MarketScreenStack.Navigator>
			<MarketScreenStack.Screen
				name="Market"
				component={Market}
				options={{ headerTitle: 'Market Screen' }}
			/>
		</MarketScreenStack.Navigator>
	);
}
const PortfolioScreenStack = createStackNavigator();
function PortfolioScreenNavigator() {
	return (
		<PortfolioScreenStack.Navigator>
			<PortfolioScreenStack.Screen
				name="Portfolio"
				component={Portfolio}
				options={{ headerTitle: 'Portfolio Screen' }}
			/>
		</PortfolioScreenStack.Navigator>
	);
}
const SearchScreenStack = createStackNavigator();
function SearchScreenNavigator() {
	return (
		<SearchScreenStack.Navigator>
			<SearchScreenStack.Screen
				name="Search"
				component={Search}
				options={{ headerTitle: 'Search Screen' }}
			/>
		</SearchScreenStack.Navigator>
	);
}