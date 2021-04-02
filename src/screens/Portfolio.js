import React, { useState, useEffect } from 'react'
import { StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Text, View } from 'react-native';
import { firebase } from '../firebase/config';
import { EvilIcons } from '@expo/vector-icons';
import { API_KEY, BASE_URL } from 'dotenv'
import axios from 'axios';
// import { fetchUser } from '../firebase/service';

function StockListItem({ stock }) {
	return (
		<View style={styles.stockListItem}>
			<Text style={styles.stockSymbol}>{stock.symbol}</Text>
			<Text style={styles.stockName}>{stock.description}</Text>
		</View>
	)
}

function StockList({ stocks }) {
	// console.log("stocksFromStockList", stocks)
	return (
		<ScrollView styles={styles.stockList}>
			{stocks.map((stock, i ) => (
				<TouchableOpacity key={i}// onPress={() => addStockToWatchList(stock)} key={stock.symbol}
				>
					<StockListItem stock={stock} />
				</TouchableOpacity>
			)
			)}
		</ScrollView>
	)
}


export default function Portfolio({navigation}) {

	const [userFunds, setUserFunds] = useState(0);
	const [user, setUser] = useState(0);
	// GET THE USER OBJECT (contains cashOnHand, Watchlist, OwnedStocksList)
	function fetchUser() {
		// (firebaseAuth) current user's UUID
		const userUID = firebase.auth().currentUser.uid
		// (firestoreDB) ref=collection, get user obj via onSnapshot, where id=userUID
		const ref = firebase.firestore().collection('users')
		ref.where("id", "==", userUID)
			.onSnapshot((querySnapshot) => {
				const items = []
				querySnapshot.docs.map((doc) => items.push(doc.data()));
				setUser(items[0])
			})
	}
	useEffect(() => {
		fetchUser();
	}, [])
	console.log("Portfolio, user stateVar: ", user)

	const [filteredStocks, setFilteredStocks] = useState(['GME', 'APPL'])
	const [portfolioValueDifference, setPortfolioValueDifference] = useState(-34.25);

	const [portfolioValue, setPortfolioValue] = useState(123.50);
	useEffect(() => {
		// GET value from DB (sum aggregate qtyOwned x currPrice from finnhub)
		filteredStocks.map(stock => {
			getStocks(stock)
		})
	}, [])

	const getStocks = async (text) => {
		try {
			// console.log("searchTerm", text)
			const response = await axios.get(`${BASE_URL}/search?q=${text}&token=${API_KEY}`)// await stockapi.get(`/search?q=${text}&token=${API_KEY}`)
			// console.log("getStocks", response.data.result)
			setFilteredStocks(response.data.result)
		} catch (err) {
			console.error('API Call error:', err)
		} 
	}
	
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
				<View style={styles.currentContainer}>
						{/* Greeting */}
					<View style={styles.greetContainer}>
						{/* some indo from firebaseAuth */}
						<Text style={styles.greetLabel}>{'Your portfolio is valued at'}</Text>
							{/* some info from firestoreDB */}
						<Text style={styles.portfolioValue}>{`${portfolioValue}`}</Text>
							{/* some info from firestoreDB */}
						<Text style={styles.status}>{`${portfolioValueDifference > 0 ? "UP" : "DOWN"} ${portfolioValueDifference} in the past week`}</Text> 
					</View>
					{/* Chart (Vector??) - Timeline, Changes over last period (1 week? multiple options?)*/}
					<View style={styles.chartContainer}>
						{/* Placeholder: */}
						<EvilIcons name='chart' size={300} color='white' />
					</View>
				</View>

				<View style={styles.fundingContainer}>
					<Text style={styles.fundingLabel}>{'Available funding: '}</Text>
					<Text style={styles.fundingAmount}>{user.cashOnHand}</Text>
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
				{/* <View style={styles.listingContainer}>
					 <View style={styles.listingHeader}>
						<Text style={styles.listingTitle}>Watchlist</Text>
						{/* ->Click 'See All' --> navigate() to large FlatList (StockListScreen) */}
						{/* <TouchableOpacity 
							style={styles.listingButton} 
							title="FULL LIST"
							onPress={() => displayWatchList()} 
						/>
					</View> 
					<Text style={styles.listingItem}>{'AAA1 - WatchlistStock1'}</Text>
					<Text style={styles.listingItem}>{'BBB2 - WatchlistStock2'}</Text>
					<Text style={styles.listingItem}>{'CCC3 - WatchlistStock3'}</Text>
					<Text style={styles.listingItem}>{'DDD4 - WatchlistStock4'}</Text>
					<StockList stocks={filteredStocks}/>
				</View> */}
				<Text style={styles.listingTitle}>Watchlist</Text>
				<StockList stocks={filteredStocks}/>

				{/* Footer ?  */}
				<View style={styles.footerContainer}>
					<Text style={styles.footerTextitem}>{'DiamondHands believes that ape together strong.'}</Text>
					<Text style={styles.footerTextitem}>{"Jump in, foo', we're going to the moon!"}</Text>
				</View>
			</SafeAreaView>
		</ScrollView>
    )
}

const styles = StyleSheet.create({
	scrollContainer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	currentContainer: {
		backgroundColor: "#0876EE",
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		color: "white"
	},
	greetContainer: {
		alignItems: 'center',
	},
	greetLabel: {
		fontSize: 24,
		color: 'white', 
		paddingTop: 20,
		paddingBottom: 5
	},
	portfolioValue: {
		fontSize: 32,
		color: "white",
		fontWeight: "bold",
	},
	status: {
		fontSize: 20,
		color: "white",
		paddingTop: 5,
		paddingBottom: 10
	},
	chartContainer: {
		textAlign: "center"
	// 	backgroundColor: "linear-gradient(180deg, rgba(32, 140, 249, 0.96875) 0%, #1268D0 100%),linear-gradient(0deg, #0876EE, #0876EE)" // not working - need https://docs.expo.io/versions/latest/sdk/linear-gradient/
	},
	fundingContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	fundingLabel: {
		fontSize: 26,
		// color: '#abd4b4', // lightGreen
	},
	fundingAmount: {
		fontSize: 32,
		// color: '#abd4b4', // lightGreen
	},
	// fundingButton: {
	// 	width: 100,
	// 	height: 100,
	// //	borderRadius: '50%',
	// 	margin: 10,
	// 	fontSize: 42,
	// 	color: '#abd4b4', // lightGreen
	// 	backgroundColor: '#59a66b', // medium-green
	// },
	listingContainer: {
		// border: '1px solid #59a66b',
		// borderRadius: 5,
		// width: '100%',
		paddingLeft: 1
	},
	listingHeader: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	listingTitle: {
		fontSize: 26,
		// color: '#59a66b', // medium-green
	},
	listingButton: {
		width: 80,
		height: 30,
		borderRadius: 5,
		// backgroundColor: '#59a66b', // medium-green
		// backgroundColor: '#147DF0',
	},
	listingItem: {
		fontSize: 22,
		// color: '#abd4b4', // lightGreen
	},
	stockListItem: {
		paddingBottom: 10,
		borderBottomColor: "grey",
		borderBottomWidth: 1
	},
	stockList: {
		height: 100,
	}
});