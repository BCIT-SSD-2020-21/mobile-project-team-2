import React from 'react'
import MenuIcon from './MenuIcon'
import Search from '../../screens/Search'
import {createStackNavigator} from '@react-navigation/stack'

const SearchScreenStack = createStackNavigator()
function SearchScreenNavigator() {
	return (
		<SearchScreenStack.Navigator>
			<SearchScreenStack.Screen
				name="Search"
				component={Search}
				options={Platform.OS === "android" ? {headerTitle: 'Search', headerRight: () => <MenuIcon />} : {headerTitle: 'Search'}} 
			/>
		</SearchScreenStack.Navigator>
	)
}