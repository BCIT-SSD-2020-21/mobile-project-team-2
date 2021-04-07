import React from 'react'
import { TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { EvilIcons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack'
import Portfolio from '../../screens/Portfolio'
import Search from '../../screens/Search';
import Trade from "../../screens/Trade"
import StockDetail from '../../screens/StockDetail'
import { userSignOut } from '../../firebase/service';
import { AntDesign } from '@expo/vector-icons';

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
						// fontFamily: 'Garamond',
						fontWeight: 'bold',
                    },
					headerRight: () => (
                        <TouchableOpacity
                            onPress={() => userSignOut()}
                            title="Log out"
                            color="#147DF0"
                        >
                            <AntDesign name="logout" size={28} color="#adcef7" />
                        </TouchableOpacity>
					),
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
				headerRight: () => (
                    <TouchableOpacity
                        onPress={() => userSignOut()}
                        title="Log out"
                        color="#147DF0"
                        margin="20px"
                    >
                        <AntDesign name="logout" size={24} color="black" />
                    </TouchableOpacity>
				),
			}}				
			/>	
			<PortfolioScreenStack.Screen
				name="Trade"
				component={Trade}
				options={{ 
					headerTitle: 'Trade Screen',
					headerRight: () => (
                        <TouchableOpacity
                            onPress={() => userSignOut()}
                            title="Log out"
                            color="#147DF0"
                            margin="20px"
                        >
                            <AntDesign name="logout" size={24} color="black" />
                        </TouchableOpacity>
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
                        <TouchableOpacity
                            onPress={() => userSignOut()}
                            title="Log out"
                            color="#147DF0"
                            margin="20px"
                        >
                            <AntDesign name="logout" size={24} color="black" />
                        </TouchableOpacity>
					),
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
					headerRight: () => (
                        <TouchableOpacity
                            onPress={() => userSignOut()}
                            title="Log out"
                            color="#147DF0"
                            margin="20px"
                        >
                            <AntDesign name="logout" size={24} color="black" />
                        </TouchableOpacity>
					),
				}}				
            />
			<SearchScreenStack.Screen
				name="Trade"
				component={Trade}
				options={{ 
					headerTitle: 'Trade Screen',
					headerRight: () => (
                        <TouchableOpacity
                            onPress={() => userSignOut()}
                            title="Log out"
                            color="#147DF0"
                            margin="20px"
                        >
                            <AntDesign name="logout" size={24} color="black" />
                        </TouchableOpacity>
					),
				}}
			/>
		</SearchScreenStack.Navigator>
	);
}
