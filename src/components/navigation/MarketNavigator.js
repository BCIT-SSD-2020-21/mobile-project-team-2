import React from 'react'
import MenuIcon from './MenuIcon'
import Market from '../../screens/Market'
import {createStackNavigator} from '@react-navigation/stack'

	const MarketScreenStack = createStackNavigator()
	export default function MarketScreenNavigator() {
		return (
            <MarketScreenStack.Navigator>
                <MarketScreenStack.Screen 
                name="Market"
                component={Market}
                options={Platform.OS === "android" ? {headerTitle: 'Market', headerRight: () => <MenuIcon />} : {headerTitle: 'Market'}} 
                />
            </MarketScreenStack.Navigator>
        )
	}