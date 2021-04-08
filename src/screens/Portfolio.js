import React, { useState, useEffect } from 'react'
import { Keyboard, SafeAreaView, ScrollView, TouchableOpacity, Text, TextInput, ImageBackground, View, StatusBar } from 'react-native';
import { VictoryBar, VictoryChart, VictoryArea, VictoryAxis, VictoryStack, VictoryTheme } from 'victory-native'
import { firebase } from '../firebase/config';
import { EvilIcons } from '@expo/vector-icons';
import StockList from '../components/atoms/StockList';
import PositionList from '../components/atoms/PositionList';
import Footer from '../components/atoms/Footer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { getStockQuote } from '../api/stockapi';
import styles from '../styles/portfolioStyles';
import WalletAmount from '../components/atoms/WalletAmount';
import HeaderValue from '../components/atoms/HeaderValue';

export default function Portfolio({navigation}) {

	const [nav, setNav] = useState(navigation)
	const [depositing, setDepositing] = useState(false)
    const [withdrawing, setWithdrawing] = useState(false)
	const [depositAmount, setDepositAmount] = useState(0)
    const [withdrawAmount, setWithdrawAmount] = useState(0)
    const [inputError, setInputError] = useState("")
    
	const [user, setUser] = useState(0);
	const [positions, setPositions] = useState([])
	const [portfolioValue, setPortfolioValue] = useState(0);
    const [portfolioAverageCost, setPortfolioAverageCost] = useState(0)
    const [portfolioValueSnapshots, setPortfolioValueSnapshots] = useState([])
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => { setKeyboardVisible(true); });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => { setKeyboardVisible(false); });
        return () => {
          keyboardDidHideListener.remove();
          keyboardDidShowListener.remove();
        };
      }, []);
    
    // Add Fake Data - to render victory chart
    useState(() => {
        let timestamp = 1000
        let portValue = 4000
        let snapshots = []
        for (var i = 0; i < 14; i++) {
            portValue = portValue + (Math.random() -0.5) * 3000
            timestamp = timestamp - 1
            snapshots.push({x: timestamp, y: portValue })
        }
        setPortfolioValueSnapshots(snapshots)
        
    }, [])
    // console.log("portfolioValueSnapshots: ", portfolioValueSnapshots)

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
    useEffect(() => {
            let portfolioCostAggregate = user?.cashOnHand
            positions?.map((position, index) => {
                portfolioCostAggregate += position.quantity * position.averageCostPerShare
            })
            setPortfolioAverageCost(Math.round(portfolioCostAggregate*100)/100)
    }, [positions])
    console.log("portfolioAverageCost: ", portfolioAverageCost)
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
				setPortfolioValue(Math.round(portfolioValueAggregate*100)/100)
			})
		}
	}, [positions, user])

	// -- Handlers
	// TOGGLE ADD FUNDS FORM
	const toggleDepositFunds = () => {
		setDepositing(!depositing)
        setInputError("")
	}
    const toggleWithdrawFunds = () => {
        setWithdrawing(!withdrawing)
        setInputError("")
    }
	// ADD FUNDS
	function depositFunds() {
        // Validate Input Amount
        if (depositAmount > 0) {
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
            setDepositing(false)
            setWithdrawing(false)
            setInputError("")
        } else {
            setInputError(`Invalid input, please try again.\nDeposit amount must be a valid number.`)
        }
	}
	function withdrawFunds() {
        if (withdrawAmount > 0) {
            // TRANSACTION - Create
            const transactionsRef = firebase.firestore().collection('transactions'); // to create transaction
            transactionsRef.add({
                type: "cash",
                total: -withdrawAmount,
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
            const decrement = firebase.firestore.FieldValue.increment(parseFloat(-withdrawAmount));
            const userRef = db.collection('users').doc(firebase.auth().currentUser.uid);
            userRef.update({ cashOnHand: decrement });
            setDepositAmount(0)
            setDepositing(false)
            setWithdrawing(false)
            setInputError("")
        } else {
            setInputError(`Invalid input, please try again.\nWithdraw amount must be a valid number.`)
        }
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
			<ImageBackground style={styles.background} source={{ uri: 'https://images.unsplash.com/photo-1520269604827-3a85b49d6c76?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=673&q=80' }}>
                <SafeAreaView style={styles.container}>
                    <StatusBar backgroundColor="#082b56" barStyle="light-content"/>
                
                    <HeaderValue 
                        label={'Current portfolio value'}
                        amount={portfolioValue ? portfolioValue : 0 }
                    />
                    <Text style={styles.portfolioVariance}>
                        {portfolioAverageCost && portfolioValue && 
                            `${portfolioValue > portfolioAverageCost ? "UP" : "DOWN"} ${Math.abs(portfolioValue-portfolioAverageCost).toFixed(2)} in the past week`}
                    </Text> 

					{/* Chart */}
                    { !isKeyboardVisible && portfolioValueSnapshots?.length > 2 && 
                        <VictoryChart
                            height={200}
                            width={300}
                            theme={VictoryTheme.material}
                        >
                            <VictoryAxis 
                                style={{
                                    grid: { stroke: "#818e99", strokeWidth: 0.2 },
                                }}
                            />
                            <VictoryArea
                                style={{
                                    grid: 0,
                                    data: { 
                                        stroke: '#cbdae4',
                                        fill: '#5584a466' 
                                    },
                                    // parent: { border: "1px solid #ccc"}
                                }}
                                data={portfolioValueSnapshots}
                            />
                        </VictoryChart>
                    }
                    {/* Wallet */}
                    <WalletAmount 
                        label={'Cash in wallet'}
                        amount={user?.cashOnHand ? user.cashOnHand : 0}
                        fontSizeMultiplier={2}
                    />
                    { !depositing && !withdrawing &&
                    <View style={styles.walletActions}>

                        <TouchableOpacity 
                            style={styles.fundingButton} 
                            onPress={toggleWithdrawFunds}
                        >
                            <MaterialCommunityIcons style={styles.fundingButtonText} name="cash-refund" color="black" />
                            <Text style={styles.fundingButtonText}>{depositing ? 'CANCEL' : 'WITHDRAW'}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={styles.fundingButton} 
                            onPress={toggleDepositFunds} 
                        >
                            <Text style={styles.fundingButtonText}>{depositing ? 'CANCEL' : 'DEPOSIT'}</Text>
                            <AntDesign style={styles.fundingButtonText} name="wallet" color="black" />
                        </TouchableOpacity>
                        
                    </View>
                    }
                    { depositing && 
                        <View style={styles.fundingForm}>
                            <Text style={styles.fundingLabel}>{'Enter amount to deposit: '}</Text>
                            <View style={styles.fundingInput}>
                                <Text style={styles.fundingCurrencySign}> $ </Text>
                                <TextInput style={styles.fundingFormField} placeholder ="0" onChangeText={(amount) => setDepositAmount(amount)} />
                            </View>
                            <View style={styles.fundingFormButtons}>
                                <TouchableOpacity
                                    style={styles.fundingButton} 
                                    onPress={() => depositFunds()} 
                                >
                                    <AntDesign name="checkcircleo" size={24} color="#7bc8a1" />
                                    <Text style={styles.fundingButtonText}>{'DEPOSIT'}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    style={styles.fundingButton} 
                                    onPress={() => toggleDepositFunds()} 
                                >
                                    <Text style={styles.fundingButtonText}>{'CANCEL'}</Text>
                                    <AntDesign name="closecircleo" size={24} color="#98496b" />
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.inputError}>{inputError}</Text>
                        </View>
                    }
                    { withdrawing && 
                        <View style={styles.fundingForm}>
                            <Text style={styles.fundingLabel}>{'Enter amount to withdraw: '}</Text>
                            <View style={styles.fundingInput}>
                                <Text style={styles.fundingCurrencySign}> $ </Text>
                                <TextInput style={styles.fundingFormField} placeholder ="0" onChangeText={(amount) => setWithdrawAmount(amount)} />
                            </View>
                            <View style={styles.fundingFormButtons}>
                                <TouchableOpacity 
                                    style={styles.fundingButton} 
                                    onPress={() => withdrawFunds()} 
                                >
                                    <AntDesign name="checkcircleo" size={24} color="#cab44b" />
                                    <Text style={styles.fundingButtonText}>{'WITHDRAW'}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    style={styles.fundingButton} 
                                    onPress={() => toggleWithdrawFunds()} 
                                >
                                    <Text style={styles.fundingButtonText}>{'CANCEL'}</Text>
                                    <AntDesign name="closecircleo" size={24} color="#98496b" />
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.inputError}>{inputError}</Text>
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

                    {/* Footer */}
                    <Footer />

                </SafeAreaView>
            </ImageBackground>
		</ScrollView>
    )
}

