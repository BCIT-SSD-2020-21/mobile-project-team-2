import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, TextInput, Keyboard, ScrollView, TouchableOpacity } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import stockapi from '../api/stockapi'
import { Ionicons } from '@expo/vector-icons'
// import { useStockContext } from '../context/stockContext'
import { API_KEY, BASE_URL } from 'dotenv'
import axios from 'axios';

function PromptText ({ children }) {
	return (
		<Text style={styles.promptText}>{children}</Text>
	)
}

function SearchBox({ searchText, handleChangeSearchText }) {
	return (
		<View style={styles.searchSection}>
			<Ionicons style={styles.searchIcon} name="md-search" />
			<TextInput style={styles.searchInput} placeholder="Search" defaultValue={searchText} onChangeText={(text) => handleChangeSearchText(text)}
			/>
		</View>
	)
}

function StockListItem({ stock }) {
	return (
		<View style={styles.stockListItem}>
			<Text style={styles.stockSymbol}>{stock.symbol}</Text>
			<Text style={styles.stockName}>{stock.name}</Text>
		</View>
	)
}

function StockList({ stocks }) {
	console.log("stocksFromStockList", stocks)
	return (
		<ScrollView styles={styles.stockList}>
			{stocks.map((stock, i ) => (
				<Text>{stock.description}</Text>
				// <TouchableOpacity key={i}// onPress={() => addStockToWatchList(stock)} key={stock.symbol}
				// >
				// 	<StockListItem stock={stock} />
				// </TouchableOpacity>
			)
			)}
		</ScrollView>
	)
}

export default function Search({ navigation }) {
	// const { baseURL, addToWatchList } = useStockContext()

	const [searchText, setSearchText] = useState("")
	const [filteredStocks, setFilteredStocks] = useState([])

	// useEffect(() => {
	// 	getOneStock("GME")
	// },[])

	// useEffect(() => {
	// 	fetch(`${baseURL}/all`)
	// 	.then(res => res.json())
	// 	.then(stockData => {setState(prev => ({ ...prev, stocks: stockData })) })
	// 	.catch(err => console.error(err))
	// }, [])

	const handleChangeSearchText = (text) => {
		text = text.replace(/[.*+\-?^${}()|[\]\\]/g, ''); //prevent the error caused by entering special characters
		const regex = RegExp(text, "i")
		// setState(prev => ({
		// 	...prev,
		// 	// filteredStocks: state.stocks.filter(stock => regex.test(stock.symbol) || regex.test(stock.name))
		// }))
		setSearchText(text)
	}

	useEffect(() => {
		if (searchText.length > 1) {
			searchStocks(searchText)
		}
	}, [searchText])


	const getOneStock = async ({ symbol }) => {
		try {
			const response = await stockapi.get(`/quote?symbol=${symbol}`)
			console.log(response)
		} catch (err) {
			console.error('API Call error:', err)
		}
	}

	const searchStocks = async ( text ) => {
		try {
			console.log("searchTerm", text, stockapi)
			const response = await axios.get(`${BASE_URL}/search?q=${text}&token=${API_KEY}`)// await stockapi.get(`/search?q=${text}&token=${API_KEY}`)
			console.log(response.data.result)
			setFilteredStocks(response.data.result)
		} catch (err) {
			console.error('API Call error:', err)
		} 
	}

	const handleAddStockToWatchList = (stock) => {
		addToWatchList(stock.symbol)
		navigation.navigate('Stocks')
	}

    return (
        <TouchableOpacity onPress={Keyboard.dismiss}>
			<View style={styles.container}>
				<PromptText>Type a company name or stock symbol</PromptText>

				<SearchBox 
				searchText={searchText}
				handleChangeSearchText={handleChangeSearchText}
				/>
				
				{searchText !== "" && 
				<StockList stocks={filteredStocks} // addStockToWatchList={handleAddStockToWatchList}
				/>}
			</View>
		</TouchableOpacity>
    )
}

const styles = StyleSheet.create({
	container: {
        flex: 1,
    },

	promptText: {
		marginTop: 10,
		marginBottom: 10,
		textAlign: "center"
	},

	searchSection: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: 'lightgrey',
		height: 40,
		borderRadius: 10,
		marginHorizontal: 3,
		marginTop: 5,
	},

	searchIcon: {
		paddingHorizontal: 15,
		fontSize: 20,
	},

	searchInput: {
		flex: 1, // get the rest of the space
	},

	stockListItem: {
		paddingBottom: 10,
		borderBottomColor: "red",
		borderBottomWidth: 1
	},

	stockSymbol: {
		paddingHorizontal: 10,
		paddingTop: 10,
		color: "blue",
		fontSize: 20
	},

	stockName: {
		paddingHorizontal: 10,
		color: "black"
	},

	divider: {
		marginTop: 10,
		borderBottomColor: "grey",
		borderBottomWidth: 1
	},

	stockList: {
		height: 200
	}
});



