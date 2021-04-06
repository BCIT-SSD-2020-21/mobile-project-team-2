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
	const [watchList, setWatchList] = useState([])
	const [portfolioValueDifference, setPortfolioValueDifference] = useState(-34.25);

	// GET THE USER OBJECT (contains cashOnHand, Watchlist, OwnedStocksList)
	function fetchUser() {
		const userUID = firebase.auth().currentUser.uid // (firebaseAuth)
		const userDoc = firebase.firestore().collection('users').doc(userUID) // get user document by user UID		
		userDoc.onSnapshot((doc) => {
			setUser(doc.data()); 
		})
	}
	useEffect(() => {
		fetchUser();
	}, [])

	// CurrentPortfolioValue - need 3 UseEffects:
	// 1 - loop thru user.positions (onSnapshot), getDoc, add it to Positions stateVar(Array of Obj)
	// 2 - WHEN DONE, loop thru stateVar(Array of Obj) (map()), (async)getStockQuote (cannot have async inside onsnapshot )
	// 3 - calc portfolio value
	// GET POSITIONS
	useEffect(() => {		
		if (user.positions) {
			const userUID = firebase.auth().currentUser.uid
			const positionsRef = firebase.firestore().collection('positions');
			positionsRef
				.where("userId", "==", userUID)
				.onSnapshot(
					querySnapshot => {
						const userPositions = []
						querySnapshot.forEach(doc => {
							userPositions.push(doc.data())
						})
						setPositions(userPositions); // <--- Assign Result to Positions
					},
					error => {
						console.log(error)
					}
				)
		}
	}, [user])
	// GET STOCK QUOTE , CALC PositionValue, ADD TO PositionValue StateVar 
	useEffect(() => {
		if (positions) {
			let portfolioValueAggregate = user.cashOnHand; // Start with User's Available Funds, then add...
			positions.forEach( async (position) => {
				const quoteResult = await getStockQuote(position.symbol) // from Finnhub
				portfolioValueAggregate += quoteResult?.c * position?.quantity
				setPortfolioValue(portfolioValueAggregate)
			})
		}
	}, [positions])

	// -- Handlers
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
	
		
	// Route to Full Lists:
	const displayPortfolioList = () => {
		//  navigate() to FullListScreen (takes props as any stock list) 
		console.log("displayPortfolioList clicked")
	}
	const displayWatchList = () => {
		//  navigate() to FullListScreen (takes props as any stock list) 
		console.log("displayWatchList clicked")
	}
	
	// console.log("portfolioValue: ", portfolioValue)
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

					{ user?.positions && <PositionList navigation={nav} positions={positions}/> }
					
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