import React from 'react'
import { Button } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { EvilIcons } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
	return (
		<Drawer.Navigator initialRouteName="Portfolio">
			<Drawer.Screen
				name="Portfolio"
				component={PortfolioScreenNavigator}
				options={{
					tabBarIcon: () => <EvilIcons name="star" size={30} color="black" />
				}}
			/>
			<Drawer.Screen
				name="Search"
				component={SearchScreenNavigator}
				options={{
					tabBarIcon: () => <EvilIcons name="star" size={30} color="black" />
				}}
			/>
		</Drawer.Navigator>
	)
}

import { createStackNavigator } from '@react-navigation/stack';
import Portfolio from '../../screens/Portfolio';
import Search from '../../screens/Search';

const PortfolioScreenStack = createStackNavigator();
function PortfolioScreenNavigator() {
	return (
		<PortfolioScreenStack.Navigator>
			<PortfolioScreenStack.Screen
				name="Portfolio"
				component={Portfolio}
				options={{ 
					headerTitle: 'Portfolio',
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
				//	headerLeft: () => <MenuIncon /> <-- need to create this component
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
				options={{ headerTitle: 'Search' }}
			/>
		</SearchScreenStack.Navigator>
	);
}