import React from 'react'
import { Button } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { EvilIcons } from '@expo/vector-icons';
import { userSignOut } from '../../firebase/service';
import StockDetail from '../../screens/StockDetail'
import { createStackNavigator } from '@react-navigation/stack';
import Trade from '../../screens/Trade'
import Portfolio from '../../screens/Portfolio';
import Search from '../../screens/Search';
import MenuIcon from '../navigation/MenuIcon'

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
				options={
					Platform.OS === "android" ?
					{headerTitle: 'Portfolio',
					headerTitleStyle: {
						textAlign: 'center',
						fontWeight: 'bold',
					  },
					headerRight: () => (
						<Button
							onPress={() => userSignOut()}
							title="Log out"
							color="#147DF0"
							margin="20px"
						/>
					),
					headerLeft: () => <MenuIcon /> } : {headerTitle: 'Portfolio'}}
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
					headerRight: () => (
						<Button
							onPress={() => userSignOut()}
							title="Log out"
							color="#147DF0"
							margin="20px"
						/>
					),
				}}				
			/>
			<PortfolioScreenStack.Screen
				name="Trade"
				component={Trade}
				options={{ 
					headerTitle: 'Trade Screen',
					headerRight: () => (
						<Button
							onPress={() => userSignOut()}
							title="Log out"
							color="#147DF0"
							margin="20px"
						/>
					), 
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
				options={
					Platform.OS === "android" ?
					{headerTitle: 'Search',
					headerTitleStyle: {
						textAlign: 'center',
						fontWeight: 'bold',
					  },
					headerRight: () => (
						<Button
							onPress={() => userSignOut()}
							title="Log out"
							color="#147DF0"
							margin="20px"
						/>
					),
					headerLeft: () => <MenuIcon /> } : {headerTitle: 'Search'}}
			/>

			<SearchScreenStack.Screen 
				name="StockDetail" 
				component={StockDetail} 
				options={{ 
					headerTitle: 'Stock Detail',
					headerTitleStyle: {
						textAlign: 'center',
						fontWeight: 'bold',
					  },
					headerRight: () => (
						<Button
							onPress={() => userSignOut()}
							title="Log out"
							color="#147DF0"
							margin="20px"
						/>
					),
				}}				
			/>
			<SearchScreenStack.Screen
				name="Trade"
				component={Trade}
				options={{ 
					headerTitle: 'Trade Screen',
					headerRight: () => (
						<Button
							onPress={() => userSignOut()}
							title="Log out"
							color="#147DF0"
							margin="20px"
						/>
					), 
				}}
			/>
				
		</SearchScreenStack.Navigator>
	)
}
