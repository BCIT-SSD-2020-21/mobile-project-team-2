import React, {useState, useEffect} from 'react'
import {StyleSheet, Button, SafeAreaView, ScrollView, View, Vibration, TouchableOpacity, Text } from 'react-native';
import {getStockProfile, getStockQuote} from '../api/stockapi';

const styles = StyleSheet.create({

	container: {
		flex: 1,
    paddingTop: 45,
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
		textAlign: 'center',
    	marginVertical: 15,
		width: '60%',
    	minHeight: '20%',
		flexDirection: 'row',
		fontSize: 32,
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
  const [stockProfile, setStockProfile] = useState({})
  const [stockQuote, setStockQuote] = useState({})
  const [currentNumber, setCurrentNumber] = useState('');
  const [totalAmount, setTotalAmount] = useState(0)

  const buttons = [1,2,3, 4,5,6, 7,8,9, '', 0,'X']
  function handleInput(buttonPressed) {
    if(buttonPressed === 1 || buttonPressed === 2 || buttonPressed === 3 || buttonPressed === 4 || buttonPressed === 5 ||
		buttonPressed === 6 || buttonPressed === 7 || buttonPressed === 8 || buttonPressed === 9 || buttonPressed === 0  ) {
      Vibration.vibrate(35);
      setCurrentNumber(currentNumber + buttonPressed)
      return
    }
    switch(buttonPressed) {
      case 'X':
        Vibration.vibrate(35);
        setCurrentNumber('')
        return
    }
    setCurrentNumber(currentNumber + buttonPressed)
  }

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


  console.log("Trade, symbol: ", symbol)
  console.log("Trade, type: ", transactionType)
  console.log('Trade, stockProfile: ', stockProfile)
  console.log('Trade, stockQuote: ', stockQuote)
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
        <View style={styles.wallet} >
          <Text style={styles.renderValues}>Available funds: </Text> 
          <Text style={styles.renderValues}>{`$${Math.round(stockQuote.c).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`}</Text>
        </View>
        <View style={styles.wallet} >
          <Text style={styles.renderValues}>Current price: </Text> 
          <Text style={styles.renderValues}>{`$${Math.round(stockQuote.c).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`}</Text>
        </View>
        <View style={styles.wallet} >
          <Text style={styles.renderValues}>Total cost: </Text> 
          <Text style={styles.renderValues}>{`$${Math.round(stockQuote.c).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`}</Text>
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
          <Button style={styles.buttonContinue}
            title="Continue"
            onPress={() => Alert.alert('button continue pressed')}
          />
        </View>
      {/* </ScrollView> */}
    </SafeAreaView>
  )
}
