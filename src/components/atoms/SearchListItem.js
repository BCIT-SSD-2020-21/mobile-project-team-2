import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function SearchListItem({navigation, stock}) {
        
    const toStockDetail = () => {
        if (stock.symbol) {
          navigation.navigate('StockDetail', stock.symbol)
        }
      }
    
    return (
        <TouchableOpacity style={styles.stockListItem} onPress={() => toStockDetail()}>
 			<Text style={styles.stockSymbol}>{stock.symbol}</Text>
 			<Text style={styles.stockName}>{stock.description}</Text>
 		</TouchableOpacity>
    )
}

const styles = StyleSheet.create({
	stockListItem: {
		paddingBottom: 10,
		borderBottomColor: "grey",
		borderBottomWidth: 0.3
	},

	stockSymbol: {
		paddingHorizontal: 10,
		paddingTop: 10,
		color: "#adcef7",
		fontSize: 20
	},

	stockName: {
		paddingHorizontal: 10,
		color: "#818e99"
	},
})