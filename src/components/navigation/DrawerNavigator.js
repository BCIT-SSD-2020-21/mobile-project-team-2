import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { EvilIcons } from '@expo/vector-icons'
import MarketScreenNavigator from './MarketNavigator'
import TradeScreenNavigator from './TradeNavigator'
import PortfolioScreenNavigator from './PortfolioNavigator'
import SearchScreenNavigator from './SearchNavigator'

const Drawer = createDrawerNavigator()
export default function DrawerNavigator() {
    return (
		<Drawer.Navigator initialRouteName="Market">
			{/* ScreenOne Stack */}
			<Drawer.Screen
				name="Market"
				component={MarketScreenNavigator}
				options={{
					tabBarIcon: () => <EvilIcons name="cart" size={30} color="black" />,
				}}
			/>
			<Drawer.Screen
				name="Trade"
				component={TradeScreenNavigator}
				options={{
					tabBarIcon: () => <EvilIcons name="bell" size={30} color="black" />,
				}}
			/>
			<Drawer.Screen
				name="Portfolio"
				component={PortfolioScreenNavigator}
				options={{
					tabBarIcon: () => <EvilIcons name="archive" size={30} color="black" />,
				}}
			/>
            <Drawer.Screen
				name="Search"
				component={SearchScreenNavigator}
				options={{
					tabBarIcon: () => <EvilIcons name="search" size={30} color="black" />,
				}}
			/>
		</Drawer.Navigator>
    )
}


