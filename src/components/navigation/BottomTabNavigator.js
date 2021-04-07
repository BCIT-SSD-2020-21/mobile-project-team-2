import React from 'react'
import { Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { EvilIcons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack'
import Portfolio from '../../screens/Portfolio'
import Search from '../../screens/Search';
import Trade from "../../screens/Trade"
import StockDetail from '../../screens/StockDetail'
import { userSignOut } from '../../firebase/service';

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
					headerTitle: 'Portfolio',
					// headerStyle: {
					// 	backgroundColor: '#08100a', //darkest-green
					//   },
					// headerTintColor: "#59a66b", //medium-green
					headerTitleStyle: {
						// fontFamily: 'Garamond',
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
const SearchScreenStack = createStackNavigator();
function SearchScreenNavigator() {
	return (
		<SearchScreenStack.Navigator>
			<SearchScreenStack.Screen
				name="Search"
				component={Search}
				options={{ 
					headerTitle: 'Search Stocks',
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
	);
}
