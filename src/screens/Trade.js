import React from 'react'
import {StyleSheet,Button, SafeAreaView,View, ImageBackground,FlatList,Vibration,TouchableOpacity,Text, Image,} from 'react-native';

import {useState} from 'react';


const styles = StyleSheet.create({

	container: {
		flex: 1,
		justifyContent: 'center',
    },

    results: {
      backgroundColor:  '#147DF0',
      maxWidth: '100%',
	  minHeight: '35%',
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
		paddingLeft: 40,
		justifyContent: 'center',
		flexDirection: 'row',
	},
	wallet: {
		width: '100%',
		flexDirection: 'row',
		backgroundColor:  '#147DF0',
		//paddingTop: 10,
		//paddingBottom: 10,
	}

  })

export default function Trade() {
	

const [currentNumber, setCurrentNumber] = useState('');



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



    return (
    <SafeAreaView style={styles.container}>

        <View style={styles.results}>
		<Text style={styles.companyName}>DogeCoin, Inc.</Text>
		<Text style={styles.howMany}>How many shares do you want to buy/[sell]?</Text>

        <Text style={styles.resultText}>{currentNumber}</Text>
		

		</View>
		<View style={styles.wallet} >
		<Text style={styles.renderValues}>DogCoin Price</Text> 
		<Text style={styles.renderValues}>50.65 CAD</Text>
		</View>


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
		<Button style={styles.buttonContinue}
          title="Continue"
          onPress={() => Alert.alert('button continue pressed')}
        />
		
      	</View>
        </SafeAreaView>
    )
}
