import React from 'react'
import {StyleSheet,SafeAreaView,ImageBackground,FlatList,Vibration,TouchableOpacity,Text, Image,} from 'react-native';
import {useState} from 'react';
import { Entypo } from '@expo/vector-icons';

const styles = StyleSheet.create({
	container: {
        //
    }
});

export default function Trade() {

const [currentNumber, setCurrentNumber] = useState('');
const [lastNumber, setLastNumber] = useState('')

const buttons = ['C', 'DEL', '/', 7,8,9, '*', 4,5,6, '-', 1,2,3, '+', 0, '.', '=']

function calculator() {
    
    let lastArr = currentNumber[currentNumber.length-1];
    
    if(lastArr === '/' || lastArr === '*' || lastArr === '-' || lastArr === '+' || lastArr === '.') {
      setCurrentNumber(currentNumber)
      return
    }
    else {
      let result = eval(currentNumber).toString();
      setCurrentNumber(result)
      return
    }


    return (
        <SafeAreaView style={styles.container}>
            <Text>Trade Screen</Text>
        </SafeAreaView>
    )
}
