import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { EvilIcons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack'
import Portfolio from '../../screens/Portfolio'
import Search from '../../screens/Search';
import Trade from "../../screens/Trade"
import StockDetail from '../../screens/StockDetail'
import LogOut from './LogoutIcon';

const BottomTab = createBottomTabNavigator();
export default function BottomTabNavigator() {

	return (
		<BottomTab.Navigator initialRouteName= {"Portfolio"}>
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

const PortfolioScreenStack = createStackNavigator();
function PortfolioScreenNavigator() {
	return (
		<PortfolioScreenStack.Navigator>
			<PortfolioScreenStack.Screen
				name="Portfolio"
				component={Portfolio}
				options={{ 
					headerTitle: 'PORTFOLIO',
					headerStyle: {
						backgroundColor: '#082a53', // dark-blue
                    },
					headerTintColor: '#adcef7',
					headerTitleStyle: {
						fontWeight: 'bold',
                    },
					headerRight: () => <LogOut color="#adcef7"/>
				}}
			/>
			<PortfolioScreenStack.Screen 
				name="StockDetail" 
				component={StockDetail} 
				options={{ 
				headerTitle: 'Stock Detail',
				headerTitleStyle: {
					fontWeight: 'bold',
				},
				headerRight: () => <LogOut color="#000000"/>
			}}				
			/>	

			<PortfolioScreenStack.Screen
				name="Trade"
				component={Trade}
				options={{ 
					headerTitle: 'Trade Screen',
					headerStyle: {
						backgroundColor: '#082a53', // dark-blue
                    },
					headerTintColor: '#adcef7',
					headerTitleStyle: {
						fontWeight: 'bold',
                    },
					headerRight: () => <LogOut color="#adcef7"/>
				}}
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
				options={{ 
					headerTitle: 'Search Stocks',
					headerRight: () => <LogOut color="#000000"/>
				}}
			/>

			<SearchScreenStack.Screen 
				name="StockDetail" 
				component={StockDetail} 
				options={{ 
					headerTitle: 'Stock Detail',

					headerTitleStyle: {
						fontWeight: 'bold',
					  },
					headerRight: () => <LogOut color="#000000"/>
				}}				
            />
            
			<PortfolioScreenStack.Screen
				name="Trade"
				component={Trade}
				options={{ 
					headerTitle: 'Trade Screen',
					headerStyle: {
						backgroundColor: '#082a53', // dark-blue
                    },
					headerTintColor: '#adcef7',
					headerTitleStyle: {
						fontWeight: 'bold',
                    },
					headerRight: () => <LogOut color="#adcef7"/>
				}}
			/>    
		</SearchScreenStack.Navigator>
	);
}
