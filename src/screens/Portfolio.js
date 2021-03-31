import React, { useState, useEffect } from 'react'
import {
	StyleSheet,
	SafeAreaView,
	ScrollView,
	Button,
	FlatList,
	TouchableOpacity,
	Text,
	Image,
	View
} from 'react-native';
import { firebase } from '../firebase/config';
import { EvilIcons } from '@expo/vector-icons';

const styles = StyleSheet.create({
	scrollContainer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#0f1d12', //dark-green
		minWidth: 320,
		width: '100%',
	},
	container: {
		flex: 1,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		maxWidth: 650,
    },
	greetContainer: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	greetLabel: {
		fontSize: 24,
		color: '#abd4b4', // lightGreen
	},
	greetValue: {
		fontSize: 32,
		color: '#abd4b4', // lightGreen
	},
	greetDetails: {
		fontSize: 20,
		color: '#59a66b', // medium-green
	},
	chartContainer: {
		width: '90%',
		minHeight: 300,
		// height: '30%',
		maxHeight: 450,
		backgroundColor: '#182f1d',
	},
	chartContainer: {
		// border: '1px solid #59a66b',
		borderRadius: 5,
	},
	chartIcon: {
		margin: 'auto',
		fontSize: 620,
		color: '#59a66b',
	},
	fundingContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%',
	},
	fundingLabel: {
		fontSize: 26,
		color: '#abd4b4', // lightGreen
	},
	fundingAmount: {
		fontSize: 32,
		color: '#abd4b4', // lightGreen
	},
	fundingButton: {
		width: 100,
		height: 100,
	//	borderRadius: '50%',
		margin: 10,
		fontSize: 42,
		color: '#abd4b4', // lightGreen
		backgroundColor: '#59a66b', // medium-green
	},
	listingContainer: {
		// border: '1px solid #59a66b',
		borderRadius: 5,
		width: '100%',
	},
	listingHeader: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	listingTitle: {
		fontSize: 26,
		color: '#59a66b', // medium-green
	},
	listingButton: {
		width: 80,
		height: 30,
		borderRadius: 5,
		backgroundColor: '#59a66b', // medium-green
		// backgroundColor: '#147DF0',
	},
	listingItem: {
		fontSize: 22,
		color: '#abd4b4', // lightGreen
	},
});

export default function Portfolio({navigation}) {

	const entityRef = firebase.firestore().collection('entities')
	console.log('entityRef', entityRef)

	const [portfolioValue, setPortfolioValue] = useState(123.50);
	useEffect(() => {
		// GET value from DB (sum aggregate qtyOwned x currPrice from finnhub)
	}, [])
	const [portfolioValueDifference, setPortfolioValueDifference] = useState(-34.25);
	useEffect(() => {
		// GET value from DB (sum aggregate portfolioValue (qtyOwned x currPrice from finnhub) LESS (qtyOwned x purchPrice) from firestoreDB )
	}, [portfolioValue])
	
	const fundingActionPressed = () => {
		// INITIAL: 	POST method, Add $100.00 to firestoneDB
		// LATER:   	navigate() to Funding Screen 
		console.log("fundingActionPressed clicked")
	}
	const displayPortfolioList = () => {
		//  navigate() to FullListScreen (takes props as any stock list) 
		console.log("displayPortfolioList clicked")
	}
	const displayWatchList = () => {
		//  navigate() to FullListScreen (takes props as any stock list) 
		console.log("displayWatchList clicked")
	}
	
    return (
		<ScrollView contentContainerStyle={styles.scrollContainer}>
	        <SafeAreaView style={styles.container}>

				{/* Greeting */}
				<View style={styles.greetContainer}>
						{/* some indo from firebaseAuth */}
					<Text style={styles.greetLabel}>{'Your portfolio is valued at'}</Text>
						{/* some info from firestoreDB */}
					<Text style={styles.greetValue}>{`${portfolioValue}`}</Text>
						{/* some info from firestoreDB */}
					<Text style={styles.greetDetails}>{`${portfolioValueDifference > 0 ? "UP" : "DOWN"} ${portfolioValueDifference} in the past week`}</Text> 
				</View>
	
				{/* Chart (Vector??) - Timeline, Changes over last period (1 week? multiple options?)*/}
				<View style={styles.chartContainer}>
					{/* Placeholder: */}
					<EvilIcons style={styles.chartIcon} name='chart' size={30} color='black' />
				</View>

				<View style={styles.fundingContainer}>
					<Text style={styles.fundingLabel}>{'Available funding: '}</Text>
					<Text style={styles.fundingAmount}>{'$100,000'}</Text>
					{/* INITIALLY: 		Add $50,000 CASH 
							LATER: 		navigate() to new page?  */}
					<TouchableOpacity 
						style={styles.fundingButton} 
						title="+"
						onPress={() => fundingActionPressed()} 
					/>

				</View>

				{/* Owned Stocks 
				  	-- FlatList, limit 6, top change in value */}
				<View style={styles.listingContainer}>
					<View style={styles.listingHeader}>
						<Text style={styles.listingTitle}>{'Portfolio'}</Text>
						{/* ->Click 'See All' --> navigate() to large FlatList (StockListScreen - takes as prop any list of Stocks ))  */}
						<TouchableOpacity 
							style={styles.listingButton} 
							title="FULL LIST"
							onPress={() => displayPortfolioList()} 
						/> 
					</View>
					  {/* List Item Placeholders: */}
					  <Text style={styles.listingItem}>{'AAAA - OwnedStock1'}</Text>
					  <Text style={styles.listingItem}>{'BBBB - OwnedStock2'}</Text>
					  <Text style={styles.listingItem}>{'CCCC - OwnedStock3'}</Text>
					  <Text style={styles.listingItem}>{'DDDD - OwnedStock4'}</Text>
				</View>	

				{/* Watchlist Stocks
				-- FlatList, limit 10, top change in value */}
				<View style={styles.listingContainer}>
					<View style={styles.listingHeader}>
						<Text style={styles.listingTitle}>{'Watchlist'}</Text>
						{/* ->Click 'See All' --> navigate() to large FlatList (StockListScreen) */}
						<TouchableOpacity 
							style={styles.listingButton} 
							title="FULL LIST"
							onPress={() => displayWatchList()} 
						/> 
					</View>
					<Text style={styles.listingItem}>{'AAA1 - WatchlistStock1'}</Text>
					<Text style={styles.listingItem}>{'BBB2 - WatchlistStock2'}</Text>
					<Text style={styles.listingItem}>{'CCC3 - WatchlistStock3'}</Text>
					<Text style={styles.listingItem}>{'DDD4 - WatchlistStock4'}</Text>
				</View>

				{/* Footer ?  */}
				<View style={styles.footerContainer}>
					<Text style={styles.footerTextitem}>{'DiamondHands believes that ape together strong.'}</Text>
					<Text style={styles.footerTextitem}>{"Jump in, foo', we're going to the moon!"}</Text>
				</View>
	        </SafeAreaView>
		</ScrollView>
    )
}
