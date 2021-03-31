import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { EvilIcons } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();
export default function DrawerNavigator() {
    return (
		<Drawer.Navigator initialRouteName="Market">
			{/* ScreenOne Stack */}
			<Drawer.Screen
				name="Market"
				component={MarketScreenNavigator}
				options={{
					tabBarIcon: () => <EvilIcons name="star" size={30} color="black" />,
				}}
			/>
			<Drawer.Screen
				name="Trade"
				component={TradeScreenNavigator}
				options={{
					tabBarIcon: () => <EvilIcons name="star" size={30} color="black" />,
				}}
			/>
			<Drawer.Screen
				name="Portfolio"
				component={PortfolioScreenNavigator}
				options={{
					tabBarIcon: () => <EvilIcons name="star" size={30} color="black" />,
				}}
			/>
            <Drawer.Screen
				name="Search"
				component={SearchScreenNavigator}
				options={{
					tabBarIcon: () => <EvilIcons name="star" size={30} color="black" />,
				}}
			/>
		</Drawer.Navigator>
    )
}

import { createStackNavigator } from '@react-navigation/stack';
import Market from '../../screens/Market';
import Trade from '../../screens/Trade';
import Portfolio from '../../screens/Portfolio';
import Search from '../../screens/Search';

const MarketScreenStack = createStackNavigator();
function MarketScreenNavigator() {
	return (
		<MarketScreenStack.Navigator>
			<MarketScreenStack.Screen
				name="MarketScreen"
				component={Market}
				options={{ headerTitle: 'Market' }}
			/>
		</MarketScreenStack.Navigator>
	);
}

const TradeScreenStack = createStackNavigator();
function TradeScreenNavigator() {
	return (
		<TradeScreenStack.Navigator>
			<TradeScreenStack.Screen
				name="TradeScreen"
				component={Trade}
				options={{ headerTitle: 'Trade' }}
			/>
		</TradeScreenStack.Navigator>
	);
}

const PortfolioScreenStack = createStackNavigator();
function PortfolioScreenNavigator() {
	return (
		<PortfolioScreenStack.Navigator>
			<PortfolioScreenStack.Screen
				name="Portfolio"
				component={Portfolio}
				options={{ headerTitle: 'Portfolio' }}
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
				options={{ headerTitle: 'Search' }}
			/>
		</SearchScreenStack.Navigator>
	);
}