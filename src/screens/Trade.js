import React, {useState, useEffect} from 'react'
import {StyleSheet, Button, SafeAreaView, ScrollView, View, Vibration, TouchableOpacity, Text } from 'react-native';
import {getStockProfile, getStockQuote} from '../api/stockapi';
import {firebase} from '../firebase/config';

const styles = StyleSheet.create({

	container: {
		flex: 1,
    paddingTop: 30,
    alignItems: 'center',
		justifyContent: 'center',
    backgroundColor:  '#147DF0',
    },

    results: {
      backgroundColor:  '#147DF0',
      maxWidth: '100%',
      height: 200,
	    minHeight: '25%',
      alignItems: 'center',
      justifyContent: 'center',
	 
    },
	renderValues: {
		backgroundColor:  '#147DF0',
	},

	historyText: {
		color: '#fff',
		margin: 15,
		fontSize: 35,
	},

    resultText: {
      maxHeight: 50,
      color: '#fff',
      margin: 15,
      fontSize: 45,
    },

	companyName: {
		color: '#fff',
		fontSize: 40,
		fontWeight: 'bold'
	  },

	howMany: {
		minWidth: 40,
		color: '#fff',
		margin: 15,
		fontSize: 28,
		alignItems: 'center',
		justifyContent: 'center'
	  },

    buttons: {
      width: '100%',
      height: '55%',
      flexDirection: 'row',
      flexWrap: 'wrap',
      //paddingLeft: 40,
      //paddingRight: 40,
      alignItems: 'center',
      justifyContent: 'center'
    },

    button: {
      borderColor: '#fff',
	    backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: '31%',
      minHeight: '20%',
     
    },

    textButton: {
      color: '#000',
      fontSize: 32,
    },

	buttonContinue: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: 'auto',
    marginVertical: 10,
    width: '60%',
    minHeight: 40,
    flexDirection: 'row',
    fontSize: 32,
    backgroundColor: '#68dceb', // light-blue
	},
  buttonContinueText: {
    fontSize: 24,
    textAlign: 'center',

  },

	renderValues: {
		maxHeight: 45,
		color: '#fff',
		fontSize: 25,
		// paddingLeft: 40,
		justifyContent: 'center',
		flexDirection: 'row',
	},
	wallet: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
		alignItems: 'center',
    margin: 'auto',
    width: '95%',
		flexDirection: 'row',
		
		//paddingTop: 10,
		//paddingBottom: 10,
	}

  })

export default function Trade({ route, navigation }) {
	
  const [symbol, setSymbol] = useState(route.params.symbol)
  const [transactionType, setTransactionType] = useState(route.params.type)
  const [user, setUser] = useState({})
  const [position, setPosition] = useState({}) // user's position for the Stock (if exists)
  const [transactionDocumentId, setTransactionDocumentId] = useState("")
  const [positionDocumentId, setPositionDocumentId] = useState("")
  const [stockProfile, setStockProfile] = useState({})
  const [stockQuote, setStockQuote] = useState({})
  const [currentNumber, setCurrentNumber] = useState('');
  const [totalAmount, setTotalAmount] = useState(0)

  const buttons = [1,2,3, 4,5,6, 7,8,9, '', 0,'X']
  function handleInput(buttonPressed) {
    if(buttonPressed === 1 || buttonPressed === 2 || buttonPressed === 3 || buttonPressed === 4 || buttonPressed === 5 ||
		buttonPressed === 6 || buttonPressed === 7 || buttonPressed === 8 || buttonPressed === 9 || buttonPressed === 0  ) {
      Vibration.vibrate(35);
      setCurrentNumber(parseInt(`${currentNumber}${buttonPressed}`))
      return;
    }
    switch(buttonPressed) {
      case 'X':
        Vibration.vibrate(35);
        setCurrentNumber(0)
        return
    }
    setCurrentNumber(currentNumber + buttonPressed)
  }

  useEffect(() => {
    setTotalAmount(currentNumber * stockQuote.c)
  }, [currentNumber, stockQuote])

  function fetchUser() {
		// (firebaseAuth) current user's UUID
		const userUID = firebase.auth().currentUser.uid
		// get user document by user UID; setUser		
		const userDoc = firebase.firestore().collection('users').doc(userUID)
		userDoc.onSnapshot((doc) => {
			console.log("current data: ", doc.data());
			setUser(doc.data());
		})
	}
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
    }
  }, [symbol])
  useEffect(() => {
    if (symbol) {
      (async () => {
        const quoteResult = await getStockQuote(symbol);
        console.log('quoteResult: ', quoteResult)
        setStockQuote(quoteResult)
      })();
    }
  }, [symbol])

  // get Stock Position IF Exists for User   
  useEffect(() => {
    if (user.positions)
    {
      const positionsRef = firebase.firestore().collection('positions');
      user.positions.map((positionId, index) => {
        positionsRef.doc(positionId).onSnapshot((doc) => {
          if (doc.data().symbol === symbol) { 
            setPosition(doc.data())
            console.log("Trade, getPosition useEffect, Id: ", positionId)
            setPositionDocumentId(positionId)
          }
        })
      })
    }
  }, [user, symbol])

  function submitTransaction() {
    // reference Firebase collections 
    const usersRef = firebase.firestore().collection('users'); // to update user
    const transactionsRef = firebase.firestore().collection('transactions'); // to create transaction
    const positionsRef = firebase.firestore().collection('positions'); // to update position (if exists), or create (else)

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
          userId: firebase.auth().currentUser.uid,
          timestamp: Date.now()
        }).then((docRef) => {
          // USER - Update transactions
          const newTransactions = [...user?.transactions, docRef.ZE.path.segments[1]]
          usersRef.doc(firebase.auth().currentUser.uid).update({
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
            userId: firebase.auth().currentUser.uid,
            createdOn: Date.now()
          }).then((docRef) => {
            const newPositions = [...user?.positions, docRef.ZE.path.segments[1]]
            usersRef.doc(firebase.auth().currentUser.uid).update({
              positions: newPositions,
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
        const newCashOnHand = user?.cashOnHand ? user?.cashOnHand - totalAmount : 0;
        usersRef.doc(firebase.auth().currentUser.uid).update({
          cashOnHand: newCashOnHand,
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
            userId: firebase.auth().currentUser.uid,
            timestamp: Date.now()
          }).then((docRef) => {
            // USER - Update transactions
            const newTransactions = [...user?.transactions, docRef.ZE.path.segments[1]]
            usersRef.doc(firebase.auth().currentUser.uid).update({
              transactions: newTransactions
            })
          })
          // POSITION - Update quantity, averageCostPerShare, timestamp
          console.log("updating position, Id: ", positionDocumentId)
          // const newAverageCostPerShare = ((position.quantity * position.averageCostPerShare) + (currentNumber * stockQuote.c))/(position.quantity + currentNumber)
          const newShareQuantity = position.quantity - currentNumber
          positionsRef.doc(positionDocumentId).update({
            symbol: symbol,
            quantity: newShareQuantity,
            // averageCostPerShare: newAverageCostPerShare,
            lastUpdated: Date.now()
          }).then((docRef) => {
            // USER - Update positions
            const newPositions = user?.positions.push(docRef.ZE.path.segments[1])
            usersRef.doc(firebase.auth().currentUser.uid).update({
              positions: newPositions,
            })
          })
          // USER - Update cashOnHand (ADD)
          const newCashOnHand = user?.cashOnHand ? user?.cashOnHand + totalAmount : 0;
          usersRef.doc(firebase.auth().currentUser.uid).update({
          cashOnHand: newCashOnHand,
        })
      }
    }
    setCurrentNumber(0)
    setTotalAmount(0)
    navigation.navigate("StockDetail")
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* <ScrollView> */}
        {/* Heading */}
        <View style={styles.results}>
          <Text style={styles.companyName}>{stockProfile.name}</Text>
          <Text style={styles.howMany}>{`How many shares of ${symbol} do you want to ${transactionType}?`}</Text>
          <Text style={styles.resultText}>{currentNumber}</Text>
        </View>

        {/* Transaction Info */}
        <Text>{positionDocumentId && `You own ${position.quantity} stocks`}</Text>
        <View style={styles.wallet} >
          <Text style={styles.renderValues}>Available funds: </Text> 
          <Text style={styles.renderValues}>{`$${Math.round(user?.cashOnHand).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`}</Text>
        </View>
        <View style={styles.wallet} >
          <Text style={styles.renderValues}>Current price: </Text> 
          <Text style={styles.renderValues}>{`$${Math.round(stockQuote.c).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`}</Text>
        </View>
        <View style={styles.wallet} >
          <Text style={styles.renderValues}>Total cost: </Text> 
          <Text style={styles.renderValues}>{`$${Math.round(totalAmount).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`}</Text>
        </View>

        {/* Keypad */}
        <View style={styles.buttons}>
          {buttons.map((button) =>
            button === 0 ?
            <TouchableOpacity key={button} style={[styles.button, ]} onPress={() => handleInput(button)}>
              <Text style={styles.textButton}>{button}</Text>
            </TouchableOpacity>
            :
            button === 'x' ?
            <TouchableOpacity key={button} style={[styles.button, ]} onPress={() => handleInput(button)}>
              <Text style={styles.textButton}>{button}</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity key={button} style={[styles.button ]} onPress={() => handleInput(button)}>
              <Text style={styles.textButton}>{button}</Text>
            </TouchableOpacity>
        
          )}
          {/* Submit */}
          <TouchableOpacity style={styles.buttonContinue}
            enabled={ totalAmount <= user?.cashOnHand ? true : false}
            onPress={() => submitTransaction()} 
          >
            <Text style={styles.buttonContinueText}>Continue</Text>
          </TouchableOpacity>
        </View>
      {/* </ScrollView> */}
    </SafeAreaView>
  )
}
