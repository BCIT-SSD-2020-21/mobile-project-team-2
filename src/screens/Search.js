import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, TextInput, Keyboard, ScrollView, TouchableOpacity } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import stockapi from '../api/stockapi'

export default function Search() {
	// const { baseURL, addToWatchList } = useStockContext()
	const [state, setState] = useState({
		searchText: "",
	})

	useEffect(() => {
		getStocks()
	},[])

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
			<View style={StyleSheet.container}>
				<Text style={styles.hintText}>Type a company name or stock symbol</Text>
				<View style={styles.searchSection} name="md-search" />
			</View>
		</TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
	container: {
        flex: 1,
    },
	hintText: {
		marginTop: 5,
		textAlign: "center"
	}
});



