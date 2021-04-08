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

const headerElements = {
    headerStyle: {
        backgroundColor: '#082a53',
    },
    headerTintColor: '#adcef7',
    headerTitleStyle: {
        fontWeight: 'bold',
    },
    headerRight: () => <LogOut color="#adcef7"/>,
    headerLeft: () => <MenuIcon color="#adcef7"/> 
}

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
                    ...headerElements
                }}
			/>
			<PortfolioScreenStack.Screen 
				name="StockDetail" 
				component={StockDetail} 
				options={{  
					headerTitle: 'Stock Detail',
                    ...headerElements
                }}			
			/>

			<PortfolioScreenStack.Screen 
				name="Trade" 
				component={Trade} 
				options={{ 
					headerTitle: 'Trade Screen',
                    ...headerElements
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
                    ...headerElements
                }}
			/>

			<SearchScreenStack.Screen 
				name="StockDetail" 
				component={StockDetail} 
				options={{ 
					headerTitle: 'Stock Detail',
                    ...headerElements
				}}				
			/>
			<PortfolioScreenStack.Screen 
				name="Trade" 
				component={Trade} 
				options={{ 
					headerTitle: 'Trade Screen',
                    ...headerElements
				}}				
			/>  
				
		</SearchScreenStack.Navigator>
	)
}
