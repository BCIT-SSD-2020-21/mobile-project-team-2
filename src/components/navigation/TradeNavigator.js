import React from 'react'
import MenuIcon from './MenuIcon'
import Trade from '../../screens/Trade'
import {createStackNavigator} from '@react-navigation/stack'

const TradeScreenStack = createStackNavigator()
export default function TradeScreenNavigator() {
	return (
		<TradeScreenStack.Navigator>
			<TradeScreenStack.Screen
				name="TradeScreen"
				component={Trade}
				options={Platform.OS === "android" ? {headerTitle: 'Trade', headerRight: () => <MenuIcon />} : {headerTitle: 'Trade'}}
			/>
		</TradeScreenStack.Navigator>
	)
}