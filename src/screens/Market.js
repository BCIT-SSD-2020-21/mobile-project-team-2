import React, { useEffect } from 'react'
import { StyleSheet, SafeAreaView, ImageBackground, FlatList, TouchableOpacity, Text, Image } from 'react-native';
import axios from 'axios'
import stockapi from '../api/stockapi'
	

	function Market() {
		const watchListStocks = ['GME', 'AAPL']

		useEffect(() => {
			// console.log("in market get effect")
			(watchListStocks.map(async stock => {
				var stockInfo = await getOneStock()
				console.log("stockInfo for", stock, "\n----", stockInfo)
			}))()
			
		},[])

		const getOneStock = async () => {
			try {
				const response = await stockapi.get(`/quote?symbol=GME`)
				console.log("----- GET STOCKS ----\n",response.data)
				return response.data
			} catch (err) {
				console.error('API Call error:', err)
			}
		}

		return (
			<SafeAreaView style={styles.container}>
				<Text>Portfolio</Text>
				<Text></Text>
			</SafeAreaView>
		)
	}


	const StockItem = ({ stock, selectedStock }) => {
		return (
			<View style={{ backgroundColor: stock.symbol === selectedStock.symbol ? "#373839" : "#000" }}>
				<Text style={styles.symbol}>{stock.symbol}</Text>
	
				<View style={styles.stockItemRightContainer}>
					<Text style={styles.closingPrice}>{stock.close.toFixed(2)}</Text>
	
					<View style={{ ...styles.percentageGainOrLossContainer, backgroundColor: stock.percentage >= 0 ? "#68D866" : "#F23937" }}>
						<Text style={styles.percentageGainOrLoss}>{stock.percentage}%</Text>
					</View>
				</View>
			</View>
		)
	}

	const WatchList = ({ watchListStocks, selectedStock, handleSelectStock }) => {
		return (
			<View style={styles.stockList}>
				<ScrollView>
	
					{watchListStocks.map(stock => (
						<TouchableOpacity key={stock.symbol} onPress={() => handleSelectStock(stock)}>
							<WatchListItem stock={stock} selectedStock={selectedStock} />
						</TouchableOpacity>
					))}
	
				</ScrollView>
			</View>
		)
	}
	
	const styles = StyleSheet.create({
			container: {
				flex: 1, //default, get full space
			}
	})

export default Market
