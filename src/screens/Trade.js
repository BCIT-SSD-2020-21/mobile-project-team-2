import React, {useState, useEffect} from 'react'
import { SafeAreaView, View, Vibration, TouchableOpacity, Text, ImageBackground, StatusBar } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {getStockProfile, getStockQuote} from '../api/stockapi';
import {firebase} from '../firebase/config';
import styles from '../styles/tradeScreen'

export default function Trade({ route, navigation }) {
    
    const [user, setUser] = useState({})
    const [position, setPosition] = useState({}) // user's position for the Stock (if exists)
    const [positionDocumentId, setPositionDocumentId] = useState("")
    const [stockProfile, setStockProfile] = useState({})
    const [stockQuote, setStockQuote] = useState({})
    const [currentNumber, setCurrentNumber] = useState('');
    const [totalAmount, setTotalAmount] = useState(0)
    
    const transactionType = route.params.type
    const symbol = route.params.symbol
    const userID = firebase.auth().currentUser.uid;
    const positionsRef = firebase.firestore().collection('positions');
    const usersRef = firebase.firestore().collection('users');
    const buttons = [1,2,3,4,5,6,7,8,9,'',0,'X']


    useEffect(() => {
        setTotalAmount(currentNumber * stockQuote.c)
    }, [currentNumber, stockQuote])

	useEffect(() => {
		fetchUser();
	}, [])

    useEffect(() => {
        if (symbol) {
            (async () => {
                const profileResult = await getStockProfile(symbol);
                console.log('profileResult: ', profileResult)
                setStockProfile(profileResult)
            })();

            (async () => {
                const quoteResult = await getStockQuote(symbol);
                console.log('quoteResult: ', quoteResult)
                setStockQuote(quoteResult)
            })();
        }
    }, [symbol])

    // get Stock Position IF Exists for User   
    useEffect(() => { 
        user?.positions?.map(positionId => {
            positionsRef.doc(positionId).onSnapshot(doc => {
                if (doc.data()?.symbol === symbol) { 
                    setPosition(doc.data())
                    setPositionDocumentId(positionId)
                }
            })
        })
    }, [user, symbol])


    const fetchUser = () => {
        usersRef?.doc(userID).onSnapshot(doc => {
            console.log("current data: ", doc.data());
            setUser(doc.data());
        })
    }

    
    const handleInput = (buttonPressed) => {
        if(typeof buttonPressed === 'number') {
            Vibration.vibrate(35);
            setCurrentNumber(+(`${currentNumber}${buttonPressed}`))
        } else if (buttonPressed === 'X') { 
            Vibration.vibrate(35);
            var stringNumber = currentNumber.toString()
            setCurrentNumber(stringNumber.slice(0, -1)) // remove last digit
        } else {
            return
        }
    }

    const submitTransaction = () => {
        const transactionsRef = firebase.firestore().collection('transactions'); // to create transaction
        

        if (transactionType === 'buy') {
            if (totalAmount > user?.cashOnHand) {
                return
            } else {
                // TRANSACTION - Create
                transactionsRef.add({
                    type: "stock",
                    symbol: symbol,
                    price: stockQuote.c,
                    quantity: currentNumber,
                    total: totalAmount,
                    userId: userID,
                    timestamp: Date.now()
                }).then(docRef => {
                    // USER - Update transactions
                    const newTransactions = [...user?.transactions, docRef.ZE.path.segments[1]]
                    usersRef.doc(userID).update({
                        transactions: newTransactions
                    })
                })

                // POSITION         
                // check if position exists
                console.log("positionDocumentId before conditional: ", positionDocumentId)
                if (!positionDocumentId) {
                    // POSITION - Create create
                    console.log("adding position to User")
                    positionsRef.add({
                        symbol: symbol,
                        quantity: currentNumber,
                        averageCostPerShare: stockQuote.c,
                        userId: userID,
                        createdOn: Date.now()
                    }).then(docRef => {
                        const newPositions = [...user?.positions, docRef.ZE.path.segments[1]]
                        usersRef.doc(userID).update({
                            positions: newPositions
                        })
                    })
                } else {
                    // POSITION - Update quantity, averageCostPerShare, timestamp
                    console.log("updating position, Id: ", positionDocumentId)
                    const newAverageCostPerShare = ((position.quantity * position.averageCostPerShare) + (currentNumber * stockQuote.c))/(position.quantity + currentNumber)
                    const newShareQuantity = position.quantity + currentNumber
                    positionsRef.doc(positionDocumentId).update({
                        symbol: symbol,
                        quantity: newShareQuantity,
                        averageCostPerShare: newAverageCostPerShare,
                        lastUpdated: Date.now()
                    })
                }
                
                // USER - Update cashOnHand (SUBTRACT)
                const newCashOnHand = user?.cashOnHand ? user.cashOnHand - totalAmount : 0;
                usersRef.doc(userID).update({
                    cashOnHand: newCashOnHand
                })
            }
        } else if (transactionType === 'sell') {
            
            if ( currentNumber <= position.quantity ) { 
                // TRANSACTIOn - Create
                transactionsRef.add({
                    type: "stock",
                    symbol: symbol,
                    price: stockQuote.c,
                    quantity: -currentNumber, // negative
                    total: -totalAmount, // negative
                    userId: userID,
                    timestamp: Date.now()
                }).then((docRef) => {
                    // USER - Update transactions
                    const newTransactions = [...user?.transactions, docRef.ZE.path.segments[1]]
                    usersRef.doc(userID).update({
                        transactions: newTransactions
                    })
                })
                // POSITION - Update quantity, averageCostPerShare, timestamp
                console.log("updating position, Id: ", positionDocumentId)
                // const newAverageCostPerShare = ((position.quantity * position.averageCostPerShare) + (currentNumber * stockQuote.c))/(position.quantity + currentNumber)
                const newShareQuantity = position.quantity - currentNumber
                if (newShareQuantity === 0) {
                    positionsRef.doc(positionDocumentId).delete()
                    navigation.navigate("Portfolio")

                } else {
                    positionsRef.doc(positionDocumentId).update({
                        symbol: symbol,
                        quantity: newShareQuantity,
                        // averageCostPerShare: newAverageCostPerShare,
                        lastUpdated: Date.now()
                    }).then(docRef => {
                        // USER - Update positions
                        const newPositions = user?.positions.push(docRef.ZE.path.segments[1])
                        usersRef.doc(userID).update({
                            positions: newPositions
                        })
                    })
                    // USER - Update cashOnHand (ADD)
                    const newCashOnHand = user?.cashOnHand ? user.cashOnHand + totalAmount : 0;
                    usersRef.doc(userID).update({
                        cashOnHand: newCashOnHand
                    })
                }
            }
        }
        setCurrentNumber(0)
        setTotalAmount(0)
        navigation.navigate("Portfolio")
    }

    return (    
        <ImageBackground style={styles.background} source={{ uri: 'https://images.unsplash.com/photo-1520269604827-3a85b49d6c76?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=673&q=80' }}>
        <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#082b56" barStyle="light-content"/>
            <View style={styles.BuySellContainer}>
                {/* Heading */}            
                <Text style={styles.companyName}>{stockProfile.name}</Text>
                <Text style={styles.question}>{`How many shares of ${symbol} do you want to ${transactionType}?`}</Text>
                <Text style={styles.inputNumber}>{currentNumber}</Text>

                {/* Transaction Info */}
                <Text style={{color: 'white'}}>{positionDocumentId && `You own ${position.quantity} stocks`}</Text>
                <View style={styles.wallet}>
                    <Text style={styles.renderValueLeft}>Available funds: </Text> 
                    <Text style={styles.renderValueRight}>{`$${Math.round(user?.cashOnHand).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`}</Text>
                </View>
                <View style={styles.wallet}>
                    <Text style={styles.renderValueLeft}>Current price: </Text> 
                    <Text style={styles.renderValueRight}>{`$${Math.round(stockQuote.c).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`}</Text>
                </View>
                <View style={styles.wallet}>
                    <Text style={styles.renderValueLeft}>Total cost: </Text> 
                    <Text style={styles.renderValueRight}>{`$${Math.round(totalAmount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`}</Text>

                </View>
            </View>

            {/* Keypad */}
            <View style={styles.buttons}>
                { 
                    buttons.map(button => 
                        <TouchableOpacity key={button} style={{...styles.button, borderColor: '#cbdae466'}} onPress={() => handleInput(button)}>
                            <Text style={styles.textButton}>{button}</Text>
                        </TouchableOpacity>
                )}
                {/* Submit */}
                <TouchableOpacity style={styles.buttonContinue} enabled={ totalAmount <= user?.cashOnHand ? true : false} onPress={() => submitTransaction()}>

                     <MaterialCommunityIcons style={styles.buttonContinueText} name="account-arrow-right-outline" color="black" />
                    <Text style={styles.buttonContinueText}>Continue</Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
        </ImageBackground> 
    )
}
