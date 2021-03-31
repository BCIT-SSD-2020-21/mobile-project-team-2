import React from 'react'
import MenuIcon from './MenuIcon'
import Portfolio from '../../screens/Portfolio'
import {createStackNavigator} from '@react-navigation/stack'

	const PortfolioScreenStack = createStackNavigator()
	export default function PortfolioScreenNavigator() {
		return (
            <PortfolioScreenStack.Navigator>
                <PortfolioScreenStack.Screen 
                name="Portfolio"
                component={Portfolio}
                options={Platform.OS === "android" ? {headerTitle: 'Portfolio', headerRight: () => <MenuIcon />} : {headerTitle: 'Portfolio'}} 
                />
            </PortfolioScreenStack.Navigator>
        )
	}