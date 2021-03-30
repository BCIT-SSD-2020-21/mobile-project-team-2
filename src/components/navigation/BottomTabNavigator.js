import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { EvilIcons } from '@expo/vector-icons';

const BottomTab = createBottomTabNavigator();
export default function BottomTabNavigator() {
    return (
        <BottomTab.Navigator initialRouteName="Auth">
        {/* ScreenOne Stack */}
		<BottomTab.Screen
            name="Auth"
            component={AuthScreenNavigator}
            options={{
                tabBarIcon: () => <EvilIcons name="star" size={30} color="black" />,
            }}
        />
        <BottomTab.Screen
            name="Market"
            component={MarketScreenNavigator}
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
import Auth from '../../screens/Auth';
import Market from '../../screens/Market';
import Portfolio from '../../screens/Portfolio';
// import Portfolio from '../../screens/Portfolio';
import Search from '../../screens/Search';

const AuthScreenStack = createStackNavigator();
function AuthScreenNavigator() {
	return (
		<AuthScreenStack.Navigator>
			<AuthScreenStack.Screen
				name="Auth"
				component={Auth}
				options={{ headerTitle: 'Auth Screen' }}
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