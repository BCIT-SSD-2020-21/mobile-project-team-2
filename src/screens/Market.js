import React, { useEffect } from 'react'
import { StyleSheet, SafeAreaView, ImageBackground, FlatList, TouchableOpacity, Text, Image } from 'react-native';
import axios from 'axios'
import stockapi from '../api/stockapi'


	function Market() {
		const watchListStocks = ['GME', 'AAPL']

		useEffect(() => {
			console.log("in market get effect")
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
			container: {
				flex: 1, //default, get full space
			},
		
			stockList: {
				flex: 4, //get 4/5 space
			},
		
			stockItem: {
				flexDirection: "row",
				justifyContent: "space-between",
				alignItems: "center",
				padding: scaleSize(10),
				borderBottomWidth: scaleSize(1),
				borderBottomColor: "#2F2F2F",
			},
		
			stockItemRightContainer: {
				flexDirection: "row",
				alignItems: "center",
			},
		
			symbol: {
				color: "#fff",
				fontSize: scaleSize(20),
			},
		
			closingPrice: {
				color: "#fff",
				fontSize: scaleSize(20),
				marginRight: scaleSize(20),
			},
		
			percentageGainOrLossContainer: {
				flexDirection: "row",
				justifyContent: "flex-end",
				alignItems: "center",
		
				width: scaleSize(100),
				height: scaleSize(35),
				borderRadius: scaleSize(10),
			},
		
			percentageGainOrLoss: {
				color: "#fff",
				fontSize: scaleSize(20),
				paddingRight: scaleSize(5),
			},
		
		
			// start of stock detail css
			stockDetail: {
				flex: 1, //get 1/5 space
				backgroundColor: "#202122" //grey
			},
		
			stockHeader: {
				flex: 2,
				justifyContent: "center",
				alignItems: "center",
				borderBottomWidth: scaleSize(0.5),
				borderBottomColor: "#BCBCBC",
			},
		
			stockName: {
				color: "#fff",
				fontSize: scaleSize(20),
			},
		
			stockDetailRow: {
				flex: 1,
				flexDirection: "row",
				borderBottomWidth: scaleSize(1),
				borderBottomColor: "#404142",
			},
		
			stockProperty: {
				flex: 1, // get 1/(1+1) => 1/2 space
				flexDirection: "row",
				justifyContent: "space-between",
				alignItems: "center",
				padding: scaleSize(3),
			},
		
			stockPropertyName: {
				color: "#616263" //grey
			},
		
			stockPropertyValue: {
				color: "#fff",
				fontSize: scaleSize(15)
			},
		}
	});

export default Market
