import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, TextInput, Keyboard, ScrollView, TouchableOpacity } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import stockapi from '../api/stockapi'
import { Ionicons } from '@expo/vector-icons'

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

export default function Search() {
	// const { baseURL, addToWatchList } = useStockContext()
	const [state, setState] = useState({
		searchText: "",
	})

	useEffect(() => {
		getStocks()
	},[])

	const handleChangeSearchText = (text) => {
		text = text.replace(/[.*+\-?^${}()|[\]\\]/g, ''); //prevent the error caused by entering special characters
		const regex = RegExp(text, "i")
		setState(prev => ({
			...prev,
			searchText: text,
			filteredStocks: state.stocks.filter(stock => regex.test(stock.symbol) || regex.test(stock.name))
		}))
	}

	const getStocks = async () => {
		try {
			const response = await stockapi.get(`/quote?symbol=GME`)
			console.log(response)
		} catch (err) {
			console.error('API Call error:', err)
		}
	}

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={styles.container}>
				<PromptText>Type a company name or stock symbol</PromptText>

				<SearchBox 
				searchText={state.searchText}
				handleChangeSearchText={handleChangeSearchText}
				/>
				
				{state.searchText !== "" && 
				<StockList stocks={state.filteredStocks} addStockToWatchList={handleAddStockToWatchList}
				/>}
			</View>
		</TouchableWithoutFeedback>
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
});



