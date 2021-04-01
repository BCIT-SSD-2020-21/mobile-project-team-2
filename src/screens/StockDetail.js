import React, {useState, useEffect} from 'react'
import {
	StyleSheet,
	SafeAreaView,
	ImageBackground,
	FlatList,
	TouchableOpacity,
	Text,
	Image,
	View,
} from 'react-native';
import { API_KEY, BASE_URL } from 'dotenv'
import axios from 'axios';
import stockapi from '../api/stockapi'

const styles = StyleSheet.create({
	container: {
        //
    }
});




const StockDetail = ({ route, navigation}) => {
	const {symbol} = route.params
	const [symbolVal, setSymbol] = useState(symbol )
	const [stock, setStock] = useState({})
	const [error, setError] = useState('')

	const getOneStock = async ({ symbolVal }) => {
		try {
			const response = await axios.get(`${BASE_URL}/stock/profile?symbol=${symbolVal}&token=${API_KEY}`)
			return (response)
		} catch (err) {
			console.error('API Call error:', err)
		}
	}

	useEffect(() => {
		getOneStock({symbolVal})
	},[symbolVal])

    return (
		<View>
		{ stock ? 
			<SafeAreaView style={styles.container}>
				<View style={{ backgroundColor:  "#373839" }}>
					<Text style={styles.symbol}>{stock.symbol}</Text>
		
					<View style={styles.stockItemRightContainer}>
						{/* <Text style={styles.closingPrice}>{stock.close.toFixed(2)}</Text> */}
		
						<View style={{ ...styles.percentageGainOrLossContainer, backgroundColor: stock.percentage >= 0 ? "#68D866" : "#F23937" }}>
							<Text style={styles.percentageGainOrLoss}>{stock.percentage}%</Text>
						</View>
					</View>
				</View>
			</SafeAreaView>
			:
			<Text> Loading</Text>
		}
		</View>
    )
}

export default StockDetail
