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
		<BottomTab.Navigator initialRouteName= {"Portfolio"} tabBarOptions={{ style: { backgroundColor: '#0C0E10', borderTopWidth: 0}}}> 
        {/* USE TO CHANGE ACTIVE/INACTIVE - LEAVES WHITE SPACE AT BOTTOM activeTintColor: '#F9E79F', activeBackgroundColor: '#0C0E10', inactiveTintColor: '#F9E79F', inactiveBackgroundColor: '#0C0E10' */}
        {/* USE TO FILL IN BOTTOMTAB COMPLETELY style: { backgroundColor: '#0C0E10', borderTopWidth: 0} */}
			<BottomTab.Screen
                name="Portfolio"
                component={PortfolioScreenNavigator}
                style="backgroundColor: #082a53"
                options={{
                    tabBarIcon: () => <EvilIcons name="user" size={30} color="#F9E79F" />,
                }}
			/>
			<BottomTab.Screen
                name="Search"
                component={SearchScreenNavigator}
                options={{
                    tabBarIcon: () => <EvilIcons name="search" size={30} color="#F9E79F" />,
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
					headerStyle: {
                        textAlign: 'center',
						backgroundColor: '#041C2F', // dark-blue
					  },
					headerTintColor: '#adcef7',
					headerTitleStyle: {
						// fontFamily: 'Garamond',
						textAlign: 'center',
						fontWeight: 'bold',
                    },
					headerRight: () => (
                        <TouchableOpacity
                            onPress={() => userSignOut()}
                            title="Log out"
                            color="#147DF0"
                        >
                            <AntDesign name="logout" size={24} style={{ marginRight: 10 }} color="#adcef7" />
                        </TouchableOpacity>
					),
				}}
			/>
			<PortfolioScreenStack.Screen 
				name="StockDetail" 
				component={StockDetail} 
				options={{ 
				headerTitle: 'Stock Detail',
                headerStyle: {
                    backgroundColor: '#041C2F'
                },
                headerTintColor: '#adcef7',
				headerTitleStyle: {
					textAlign: 'center',
					fontWeight: 'bold',
				},
				headerRight: () => (
                    <TouchableOpacity
                        onPress={() => userSignOut()}
                        title="Log out"
                        color="#147DF0"
                        margin="20px"
                    >
                        <AntDesign name="logout" size={24} style={{ marginRight: 10 }} color="#adcef7" />
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
                            <AntDesign name="logout" size={24} style={{ marginRight: 10 }} color="black" />
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
					headerTitle: 'Search',
                    headerStyle: {
                        backgroundColor: '#041C2F'
                    },
                    headerTintColor: '#adcef7',
                    headerTitleStyle: {
                        textAlign: 'center',
                        fontWeight: 'bold',
                    },
					headerRight: () => (
                        <TouchableOpacity
                            onPress={() => userSignOut()}
                            title="Log out"
                            color="#147DF0"
                            margin="20px"
                        >
                            <AntDesign name="logout" size={24} style={{ marginRight: 10 }} color="#adcef7" />
                        </TouchableOpacity>
					),
				}}
			/>

			<SearchScreenStack.Screen 
				name="StockDetail" 
				component={StockDetail} 
				options={{ 
					headerTitle: 'Stock Detail',
                    headerStyle: {
                        backgroundColor: '#041C2F'
                    },
                    headerTintColor: '#adcef7',
                    headerTitleStyle: {
                        textAlign: 'center',
                        fontWeight: 'bold',
                    },
					headerRight: () => (
                        <TouchableOpacity
                            onPress={() => userSignOut()}
                            title="Log out"
                            color="#147DF0"
                            margin="20px"
                        >
                            <AntDesign name="logout" size={24} style={{ marginRight: 10 }} color="#adcef7" />
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
                            <AntDesign name="logout" size={24} style={{ marginRight: 10 }} color="black" />
                        </TouchableOpacity>
					),
				}}
			/>
		</SearchScreenStack.Navigator>
	);
}
