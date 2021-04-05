import React, { useState, useEffect } from 'react'
import { StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Text, TextInput, View } from 'react-native';
import { firebase } from '../firebase/config';
import { EvilIcons } from '@expo/vector-icons';
// import { getStockQuote } from '../api/stockapi';
// import { API_KEY, BASE_URL } from 'dotenv'
// import axios from 'axios';
import StockList from '../components/atoms/StockList';
import PositionList from '../components/atoms/PositionList';
import { getStockQuote } from '../api/stockapi';

export default function Portfolio({navigation}) {

	const [nav, setNav] = useState(navigation)
	const [depositing, setDepositing] = useState(false)
	const [depositAmount, setDepositAmount] = useState(0)
	const [user, setUser] = useState(0);
	const [positions, setPositions] = useState([])
	const [portfolioValue, setPortfolioValue] = useState(0);
	const [positionsTotalValue, setPositionsTotalValue] = useState(0)
	const [watchList, setWatchList] = useState([])
	const [portfolioValueDifference, setPortfolioValueDifference] = useState(-34.25);

	// GET THE USER OBJECT (contains cashOnHand, Watchlist, OwnedStocksList)
	function fetchUser() {
		// (firebaseAuth) current user's UUID
		const userUID = firebase.auth().currentUser.uid
		// get user document by user UID; setUser		
		const userDoc = firebase.firestore().collection('users').doc(userUID)
		userDoc.onSnapshot((doc) => {
			// console.log("current data: ", doc.data()); // Shows User Object from FirestoreDB
			setUser(doc.data());
		})
	}
	useEffect(() => {
		fetchUser();
	}, [])
	// console.log("Portfolio, user.positions: ", user.positions)

	// get User's Positions (All)   
	useEffect(() => {
		// initialize portfolioValue calculation 
		setPortfolioValue(0)
		if (user)
		{
			// (async () => {
				
				const positionsRef = firebase.firestore().collection('positions');
				let userPositionsAggregateValue = 0;
				user.positions.map((positionId, index) => {
			  		positionsRef.doc(positionId).onSnapshot(async (doc) => { 
						// userPositions.push(doc.data())
						console.log("portfolioValue useEffect, doc.data.symbol: ", doc.data().symbol)
						const positionStockQuote = await getStockQuote(doc.data().symbol)
						console.log("portfolioValue useEffect, positionStockQuote: ", positionStockQuote)
						console.log("portfolioValue useEffect, doc.data(): ", doc.data())
						userPositionsAggregateValue = userPositionsAggregateValue + positionStockQuote.c*doc.data().quantity 
						console.log("portfolioValue useEffect, userPositionsAggregateValue: ", userPositionsAggregateValue)
						setPositionsTotalValue(positionsTotalValue + userPositionsAggregateValue)						
			  		})
				})
				// setPortfolioValue(user.cashOnHand + userPositionsAggregateValue)
			// })();
		}
	}, [user])
	useEffect(() => {
		setPortfolioValue(user.cashOnHand + positionsTotalValue)
	}, [positionsTotalValue])

	// TOGGLE ADD FUNDS FORM
	function toggledepositFunds() {
		setDepositing(!depositing)
	}

	// ADD FUNDS
	function depositFunds() {
		// TRANSACTION - Create
		const transactionsRef = firebase.firestore().collection('transactions'); // to create transaction
        transactionsRef.add({
			type: "cash",
			total: depositAmount,
			userId: firebase.auth().currentUser.uid,
			timestamp: Date.now()
			}).then((docRef) => {
			// USER - Update transactions
			const newTransactions = [...user?.transactions, docRef.ZE.path.segments[1]]
			usersRef.doc(firebase.auth().currentUser.uid).update({
			  transactions: newTransactions
			})
		  })
		// get current user's UID
		const db = firebase.firestore();
		const increment = firebase.firestore.FieldValue.increment(parseFloat(depositAmount));
		const userRef = db.collection('users').doc(firebase.auth().currentUser.uid);
		userRef.update({ cashOnHand: increment });
		setDepositAmount(0)
		toggledepositFunds();
	}
	function withdrawFunds() {
		// same as deposit, but negative amount
		// pending button and textinput
	}

	useEffect(() => {
		// GET value from DB (sum aggregate qtyOwned x currPrice from finnhub)
		// watchList.map(stock => {
		// 	getStocks(stock)
		// })
	}, [])

	const getStocks = async (text) => {
		try {
			// console.log("searchTerm", text)
			// const response = await axios.get(`${BASE_URL}/search?q=${text}&token=${API_KEY}`)// await stockapi.get(`/search?q=${text}&token=${API_KEY}`)
			// console.log("getStocks", response.data.result)
			// setwatchList(response.data.result)
		} catch (err) {
			console.error('API Call error:', err)
		} 
	}
	
	useEffect(() => {
		// GET value from DB (sum aggregate portfolioValue (qtyOwned x currPrice from finnhub) LESS (qtyOwned x purchPrice) from firestoreDB )
	}, [portfolioValue])
	
	// const fundingActionPressed = () => {
	// 	console.log("fundingActionPressed clicked");
	// 	// INITIAL: 	POST method, Add $100.00 to firestoneDB
	// 	// LATER:   	navigate() to Funding Screen 
	// 	depositFunds();
		
	// }
	const displayPortfolioList = () => {
		//  navigate() to FullListScreen (takes props as any stock list) 
		console.log("displayPortfolioList clicked")
	}
	const displayWatchList = () => {
		//  navigate() to FullListScreen (takes props as any stock list) 
		console.log("displayWatchList clicked")
	}
	
	console.log("portfolioValue: ", portfolioValue)
    return (
		<ScrollView contentContainerStyle={styles.scrollContainer}>
			<SafeAreaView style={styles.container}>
				<View style={styles.currentContainer}>
						{/* Greeting */}
					<View style={styles.greetContainer}>
						{/* some indo from firebaseAuth */}
						<Text style={styles.greetLabel}>{'Your portfolio is valued at'}</Text>
							{/* some info from firestoreDB */}
						<Text style={styles.portfolioValue}>{`$${Math.round(portfolioValue).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`}</Text>
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
					<Text style={styles.fundingAmount}>{user?.cashOnHand ? `$${Math.round(user.cashOnHand).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}` : '$0.00'}</Text>
					{/* INITIALLY: 		Add $50,000 CASH 
							LATER: 		navigate() to new page?  */}
					<TouchableOpacity 
						style={styles.fundingButton} 
						onPress={toggledepositFunds} 
					>
						<Text style={styles.fundingButtonText}>{depositing ? 'CANCEL' : 'ADD $'}</Text>
					</TouchableOpacity>
				</View>

				{ depositing && 
					<View style={styles.fundingForm}>
						<Text style={styles.fundingLabel}>{'Enter an amount: '}</Text>
						<TextInput style={styles.fundingFormField} placeholder ="$" onChangeText={(amount) => setDepositAmount(amount)} />
						<TouchableOpacity 
							style={styles.fundingButton} 
							onPress={() => depositFunds()} 
						>
							<Text style={styles.fundingButtonText}>{'Submit'}</Text>
						</TouchableOpacity>
					</View>
				}

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

					{ user?.positions && <PositionList navigation={nav} positionsArray={user.positions}/> }
					
				</View>	

				{/* Watchlist Stocks
				-- FlatList, limit 10, top change in value */}
				<View style={styles.listingContainer}>
					 <View style={styles.listingHeader}>
						<Text style={styles.listingTitle}>Watchlist</Text>
						{/* ->Click 'See All' --> navigate() to large FlatList (StockListScreen) */}
						<TouchableOpacity 
							style={styles.listingButton} 
							title="FULL LIST"
							onPress={() => displayWatchList()} 
						/>
					</View>
					<StockList navigation={nav} stockArray={user?.watchlist}/>
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
		fontSize: 20,
		// color: '#abd4b4', // lightGreen
	},
	fundingAmount: {
		fontSize: 24,
		// color: '#abd4b4', // lightGreen
	},
	fundingButton: {
		width: 60,
		height: 60,
		margin: 5,	
		padding: 10,
		borderRadius: 100,
		alignItems: 'center',
		backgroundColor: "#0876EE", // blue
	},
	fundingButtonText: {
		textAlign: 'center',
		textAlignVertical: 'center',
		fontSize: 10,
		color: '#abd4b4', // lightGreen
	},
	fundingForm: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	fundingFormField: {
		// fontFamily: 'Roboto',
		height: 40,
		fontSize: 24,
		// marginTop: 8,
		marginVertical: 10,
		paddingLeft: 3,
		paddingRight: 3,
		color: '#000000',
		borderColor: '#9b9b9b',
		borderBottomWidth: 2,	
	},
	listingContainer: {
		// borderRadius: 5,
		minWidth: 320,
		width: '100%',
		maxWidth: 400,
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
		color: '#59a66b', // medium-green
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