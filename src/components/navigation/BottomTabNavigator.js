import React , {useState, useEffect} from 'react'
import { Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { EvilIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons'; 
import { firebase } from '../../firebase/config';
import { userSignOut } from '../../firebase/service';

const BottomTab = createBottomTabNavigator();
export default function BottomTabNavigator() {

    return (
        <BottomTab.Navigator initialRouteName= {"Portfolio"}>
        {/* ScreenOne Stack */}

        <BottomTab.Screen
            name={"Market"}
            component={MarketScreenNavigator}
            options={{
                tabBarIcon: () => <EvilIcons name="chart" size={30} color="black" />,
            }}
        />
		<BottomTab.Screen
            name="Trade"
            component={TradeScreenNavigator}
            options={{
                tabBarIcon: () => <EvilIcons name="retweet" size={30} color="black" />,
            }}
        />
        <BottomTab.Screen
            name="Portfolio"
            component={PortfolioScreenNavigator}
            options={{
                tabBarIcon: () => <EvilIcons name="user" size={30} color="black" />,
            }}
        />
        <BottomTab.Screen
            name="Search"
            component={SearchScreenNavigator}
            options={{
                tabBarIcon: () => <EvilIcons name="search" size={30} color="black" />,
            }}
        />
    </BottomTab.Navigator>
    )
}

import { createStackNavigator } from '@react-navigation/stack';
import Market from '../../screens/Market';
import Portfolio from '../../screens/Portfolio';
import Search from '../../screens/Search';
import Trade from "../../screens/Trade"

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
				options={{ 
					headerTitle: 'Your Portfolio',
					headerStyle: {
						backgroundColor: '#08100a', //darkest-green
					  },
					headerTintColor: "#59a66b", //medium-green
					headerTitleStyle: {
						fontFamily: 'Garamond',
						textAlign: 'center',
						fontWeight: 'bold',
					  },
					headerRight: () => (
						<Button
							onPress={() => userSignOut()}
							title="SignOut"
							color="#59a66b" //medium-green
							margin="20px"
						/>
						),
				}}
			/>
		</PortfolioScreenStack.Navigator>
	);
}

const TradeScreenStack = createStackNavigator();
function TradeScreenNavigator() {
	return (
		<TradeScreenStack.Navigator>
			<TradeScreenStack.Screen
				name="Trade"
				component={Trade}
				options={{ headerTitle: 'Trade Screen' }}
			/>
		</TradeScreenStack.Navigator>
	);
}

const SearchScreenStack = createStackNavigator();
function SearchScreenNavigator() {
	return (
		<SearchScreenStack.Navigator>
			<SearchScreenStack.Screen
				name="Search"
				component={Search}
				options={{ headerTitle: 'Search Stocks' }}
			/>
		</SearchScreenStack.Navigator>
	);
}
