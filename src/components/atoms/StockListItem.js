import React, { useState, useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { getStockProfile, getStockQuote } from '../../api/stockapi';
import PriceAmount from './PriceAmount';
import styles from '../../styles/positionListStyles'

export default function StockListItem({ symbol, navigation }) {

    const [description, setDescription] = useState("")
    const [currentPrice, setCurrentPrice] = useState("")
    
	useEffect(() => {
      	if (symbol) {
			(async () => {
				const profileResult = await getStockProfile(symbol);
				// console.log('profileResult: ', profileResult)
				setDescription(profileResult.name)
			})();
			(async () => {
				const quoteResult = await getStockQuote(symbol);
				// console.log('quoteResult: ', quoteResult)
				setCurrentPrice(quoteResult.c)
			})();
      	}
    }, [])

    const toStockDetail = () => {
      if (symbol) {
        navigation.navigate('StockDetail', symbol)
      }
    }

    return (
    <TouchableOpacity style={styles.container} onPress={() => toStockDetail()}>
        <View style={styles.profile}>
            <Text style={styles.symbol}>{symbol}</Text>
            <Text style={styles.name}>{description}</Text>
        </View>
        <PriceAmount label={'cur'} amount={currentPrice}/>
    </TouchableOpacity>
    )
}