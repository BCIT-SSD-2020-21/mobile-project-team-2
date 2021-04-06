import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, TextInput, Keyboard, ScrollView, TouchableOpacity } from 'react-native';
import stockapi from '../api/stockapi'
import { Ionicons } from '@expo/vector-icons'
import { API_KEY, BASE_URL } from 'dotenv'
import StockList from '../components/atoms/StockList';
import SearchList from '../components/atoms/SearchList';
import axios from 'axios';

// function PromptText ({ children }) {
// 	return (
// 		<Text style={styles.promptText}>{children}</Text>
// 	)
// }

function SearchBox({ searchText, handleChangeSearchText }) {
	return (
		<View style={styles.searchSection}>
			<Ionicons style={styles.searchIcon} name="md-search" />
			<TextInput style={styles.searchInput} placeholder="Type a company name or stock symbol" defaultValue={searchText} onChangeText={(text) => handleChangeSearchText(text)}
			/>
		</View>
	)
}

export default function Search({ navigation }) {
	// const { baseURL, addToWatchList } = useStockContext()
	const [nav, setNav] = useState(navigation)

	const [searchText, setSearchText] = useState("")
	const [filteredStocks, setFilteredStocks] = useState([])

	// useEffect(() => {
	// 	getOneStock("GME")
	// },[])

	const handleChangeSearchText = (text) => {
		text = text.replace(/[.*+\-?^${}()|[\]\\]/g, ''); // prevents the error caused by the user entering special characters
		const regex = RegExp(text, "i")
		// setState(prev => ({
		// 	...prev,
		// 	// filteredStocks: state.stocks.filter(stock => regex.test(stock.symbol) || regex.test(stock.name))
		// }))
		setSearchText(text)
	}

	useEffect( () => {
		if (searchText.length > 1) {
			 searchStocks(searchText)
		}
	}, [searchText])


	const getOneStock = async ({ symbol }) => {
		try {
			const response = await stockapi.get(`/quote?symbol=${symbol}`)
			// console.log(response)
		} catch (err) {
			console.error('+++++API Call error+++++', err)
		}
	}

	const searchStocks = async ( text ) => {
		try {
			// console.log("searchTerm", text)
			const response = await axios.get(`${BASE_URL}/search?q=${text}&token=${API_KEY}`)// await stockapi.get(`/search?q=${text}&token=${API_KEY}`)
			// console.log(response.data.result)
			setFilteredStocks(response.data.result)
		} catch (err) {
			console.error('+++++API Call error+++++', err)
		} 
	}

	const handleAddStockToWatchList = (stock) => {
		addToWatchList(stock.symbol)
		navigation.navigate('Stocks')
	}

	// console.log("Search: ", filteredStocks)
    return (
		<View style={styles.container}>			
			<SearchBox 
				searchText={searchText}
				handleChangeSearchText={handleChangeSearchText}
			/>
			{searchText !== "" && 
				<SearchList navigation={nav} stocks={filteredStocks} /> // addStockToWatchList={handleAddStockToWatchList}
			}
		</View>
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
		borderBottomColor: 'grey',
		borderBottomWidth: 0.5,
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
		borderBottomColor: "grey",
		borderBottomWidth: 0.3
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

	stockList: {
		height: 200,
	},
})



