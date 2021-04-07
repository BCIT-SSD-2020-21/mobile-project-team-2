import React, { useState, useEffect } from 'react'
import { SafeAreaView, ScrollView, TouchableOpacity, Text, TextInput, View } from 'react-native';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryStack, VictoryTheme } from 'victory-native'
import { firebase } from '../firebase/config';
import { EvilIcons } from '@expo/vector-icons';
import StockList from '../components/atoms/StockList';
import PositionList from '../components/atoms/PositionList';
import { getStockQuote } from '../api/stockapi';
import styles from '../styles/portfolioStyles';
import WalletAmount from '../components/atoms/WalletAmount';

// Sample data from Victory
const data2017 = [
    {quarter: 1, earnings: 29000},
    {quarter: 2, earnings: 16500},
    {quarter: 3, earnings: 14250},
    {quarter: 4, earnings: 19000}
    ];
    const data2018 = [
    {quarter: 1, earnings: 17000},
    {quarter: 2, earnings: 11500},
    {quarter: 3, earnings: 16800},
    {quarter: 4, earnings: 13000}
    ];
    const data2019= [
    {quarter: 1, earnings: 13500},
    {quarter: 2, earnings: 11550},
    {quarter: 3, earnings: 18950},
    {quarter: 4, earnings: 15070}
    ];
    const data2020 = [
    {quarter: 1, earnings: 11001},
    {quarter: 2, earnings: 14510},
    {quarter: 3, earnings: 17150},
    {quarter: 4, earnings: 14960}
    ];

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
		if (user?.positions) {
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
	// initialize portfolioValue = cashOnHand
	useEffect(() => {
		setPortfolioValue(user?.cashOnHand)
	}, [user])
	// GET STOCK QUOTE , CALC PositionValue, ADD TO PositionValue StateVar 
	useEffect(() => {
		if (positions && user) {
			let portfolioValueAggregate = user?.cashOnHand; // Start with User's Available Funds, then add...
			positions.forEach( async (position) => {
				const quoteResult = await getStockQuote(position.symbol) // from Finnhub
				portfolioValueAggregate += quoteResult?.c * position?.quantity
				setPortfolioValue(portfolioValueAggregate)
			})
		}
	}, [positions, user])

	// -- Handlers
	// TOGGLE ADD FUNDS FORM
	const toggledepositFunds = () => {
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

                {/* Greeting */}
				<View style={styles.currentContainer}>
					<View style={styles.greetContainer}>
						{/* some indo from firebaseAuth */}
						<Text style={styles.greetLabel}>{'Your portfolio is valued at'}</Text>
						<Text style={styles.portfolioValue}>{`$${Math.round(portfolioValue).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`}</Text>
						<Text style={styles.status}>{`${portfolioValueDifference > 0 ? "UP" : "DOWN"} ${portfolioValueDifference} in the past week`}</Text> 
					</View>
					{/* Chart (Vector??) - Timeline, Changes over last period (1 week? multiple options?)*/}
					{/* <View style={styles.chartContainer}> */}
                        <VictoryChart domainPadding={20} width={350} height={200} theme={VictoryTheme.material}>
                            <VictoryAxis tickValues={[ 1, 2, 3, 4 ]} tickFormat={[ "Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]} />
                            <VictoryAxis dependentAxis tickFormat={(x) => (`$${x / 1000}k`)} />
                                <VictoryStack colorScale={"warm"}>
                                    <VictoryBar data={data2017} x="quarter" y="earnings" />
                                    <VictoryBar data={data2018} x="quarter" y="earnings" />
                                    <VictoryBar data={data2019} x="quarter" y="earnings" />
                                    <VictoryBar data={data2020} x="quarter" y="earnings" />
                                </VictoryStack>
                        </VictoryChart>
					</View>
				{/* </View> */}


				<View style={styles.fundingContainer}>
					{/* <Text style={styles.fundingLabel}>{'Available funding: '}</Text>
					<Text style={styles.fundingAmount}>{user?.cashOnHand ? `$${Math.round(user.cashOnHand).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}` : '$0.00'}</Text> */}
					
                    <WalletAmount 
                        label={'Cash in wallet'}
                        amount={user?.cashOnHand ? user.cashOnHand : 0}
                        fontSizeMultiplier={2}
                        // scale={0}
                    />

                    <View>
                        
                    </View>
                    
                    
					{/* <TouchableOpacity 
						style={styles.fundingButton} 
						onPress={toggledepositFunds} 
					>
						<Text style={styles.fundingButtonText}>{depositing ? 'CANCEL' : 'ADD $'}</Text>
					</TouchableOpacity> */}
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

