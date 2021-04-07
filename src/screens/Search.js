import React, { useState, useEffect } from 'react'
import { View, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import SearchList from '../components/atoms/SearchList';
import styles from '../styles/searchStyles'
import { searchStocks } from '../api/stockapi';

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
	const [nav, setNav] = useState(navigation)

	const [searchText, setSearchText] = useState("")
	const [filteredStocks, setFilteredStocks] = useState([])

	const handleChangeSearchText = (text) => {
		text = text.replace(/[.*+\-?^${}()|[\]\\]/g, ''); // prevents the error caused by the user entering special characters
		const regex = RegExp(text, "i")
		setSearchText(text)
	}

	useEffect(() => {
		if (searchText.length > 1) {
			(async () => {
                const searchResult = await searchStocks(searchText);
                setFilteredStocks(searchResult)
            })();
		}
	}, [searchText])

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
			{
				searchText !== "" && 
				<SearchList navigation={nav} stocks={filteredStocks} /> // addStockToWatchList={handleAddStockToWatchList}
			}
		</View>
    )
}



