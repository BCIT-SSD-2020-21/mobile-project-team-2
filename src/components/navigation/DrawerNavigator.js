import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { EvilIcons } from '@expo/vector-icons';
import StockDetail from '../../screens/StockDetail'
import { createStackNavigator } from '@react-navigation/stack';
import Trade from '../../screens/Trade'
import Portfolio from '../../screens/Portfolio';
import Search from '../../screens/Search';
import MenuIcon from '../navigation/MenuIcon'
import LogOut from './LogoutIcon';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
	return (
		<Drawer.Navigator initialRouteName="Portfolio">
			<Drawer.Screen
				name="Portfolio"
				component={PortfolioScreenNavigator}
				options={{
					tabBarIcon: () => <EvilIcons name="archive" size={30} color="black" />
				}}
			/>
			<Drawer.Screen
				name="Search"
				component={SearchScreenNavigator}
				options={{
					tabBarIcon: () => <EvilIcons name="search" size={30} color="black" />
				}}
			/>
		</Drawer.Navigator>
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
                    headerTitle: 'Portfolio',
                    headerStyle: {
						backgroundColor: '#082a53',
                    },
					headerTintColor: '#adcef7',
					headerTitleStyle: {
						fontWeight: 'bold',
                    },
                    headerRight: () => <LogOut color="#adcef7"/>,
                    headerLeft: () => <MenuIcon color="#adcef7"/> 
                }}
			/>
			<PortfolioScreenStack.Screen 
				name="StockDetail" 
				component={StockDetail} 
				options={{ 
					headerTitle: 'Stock Detail',
					headerTitleStyle: {
						textAlign: 'center',
						fontWeight: 'bold',
					},
					headerRight: () => <LogOut color="black"/>,
                    headerLeft: () => <MenuIcon color="black"/> 
				}}				
			/>

			<PortfolioScreenStack.Screen 
				name="Trade" 
				component={Trade} 
				options={{ 
					headerTitle: 'Trade Screen',
                    headerStyle: {
						backgroundColor: '#082a53',
                    },
					headerTintColor: '#adcef7',
					headerTitleStyle: {
						fontWeight: 'bold',
                    },
                    headerRight: () => <LogOut color="#adcef7"/>,
                    headerLeft: () => <MenuIcon color="#adcef7"/>
				}}				
			/>            
 
		</PortfolioScreenStack.Navigator>
	);
}

const SearchScreenStack = createStackNavigator()
function SearchScreenNavigator() {
	return (
		<SearchScreenStack.Navigator>
			<SearchScreenStack.Screen
				name="Search"
				component={Search}
				options={{
                    headerTitle: 'Search',
                    headerStyle: {
						backgroundColor: '#082a53',
                    },
					headerTintColor: '#adcef7',
					headerTitleStyle: {
						fontWeight: 'bold',
                    },
					headerRight: () => <LogOut color="#adcef7"/>,
                    headerLeft: () => <MenuIcon color="#adcef7"/> 
                }}
			/>

			<SearchScreenStack.Screen 
				name="StockDetail" 
				component={StockDetail} 
				options={{ 
					headerTitle: 'Stock Detail',
                    headerStyle: {
						backgroundColor: '#082a53',
                    },
					headerTintColor: '#adcef7',
					headerTitleStyle: {
						fontWeight: 'bold',
                    },
                    headerRight: () => <LogOut color="#adcef7"/>,
                    headerLeft: () => <MenuIcon color="#adcef7"/> 
				}}				
			/>
			<PortfolioScreenStack.Screen 
				name="Trade" 
				component={Trade} 
				options={{ 
					headerTitle: 'Trade Screen',
                    headerStyle: {
						backgroundColor: '#082a53',
                    },
					headerTintColor: '#adcef7',
					headerTitleStyle: {
						fontWeight: 'bold',
                    },
                    headerRight: () => <LogOut color="#adcef7"/>,
                    headerLeft: () => <MenuIcon color="#adcef7"/> 
				}}				
			/>  
				
		</SearchScreenStack.Navigator>
	)
}
