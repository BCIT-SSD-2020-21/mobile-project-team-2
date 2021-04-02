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
	ScrollView
} from 'react-native';
import { API_KEY, BASE_URL } from 'dotenv'
import axios from 'axios';
import stockapi from '../api/stockapi'
import { EvilIcons } from '@expo/vector-icons';


const styles = StyleSheet.create({
	safeAreaContainer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
    },
	scrollContainer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
		flexDirection: 'column',
	},		
	titleContainer: {
		width: "100%",
		textAlign: "center",
		backgroundColor: "#0876EE",
	},		
	bodyContainer: {
		flexDirection: 'column',
		justifyContent: 'start',
		width: "80%",
		marginHorizontal : "auto",
		alignItems: 'start',
	},
	activities : {
		fontSize: "2rem",
		marginVertical: 10,
	},
	activity: {
		display: 'flex',
		width: "70%",
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginVertical: 5,
	},	
	activityLeft : {
		fontSize: "1.2rem",
	},
	activityRight : {
		fontSize: "1.2rem",
	},
	company : {
		fontSize: "2rem",
		marginVertical: 10,
	},
	description : {
		fontSize: "1rem",
		marginVertical: 5,
	},
	buttons : {
		display: 'flex',
		width: "100%",
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginVertical: 5,
	},	
    button: {
		borderColor: "#0876EE",
		backgroundColor: "#0876EE",
		alignItems: 'center',
		justifyContent: 'center',
		width: '40%',
		marginLeft: 0,
		color: 'white',
		fontSize: '1.5rem', 
		height: 40, 
    },	

});




const StockDetail = ({ route, navigation}) => {
	 const {symbol} = route.params
	 const [symbolVal, setSymbol] = useState(symbol??'' )
	const [stock, setStock] = useState({})
	const [error, setError] = useState('')
	const [inited, setInited] = useState(false)

	const getOneStock = async ({ symbolVal }) => {
		try {
			const response = await axios.get(`${BASE_URL}/stock/profile?symbol=${symbolVal}&token=${API_KEY}`)
			setStock(response.data)
		} catch (err) {
			console.error('API Call error:', err)
		}
	}

	useEffect(() => {
		getOneStock({symbolVal})
	},[])

    return (
		<ScrollView contentContainerStyle ={styles.scrollContainer}>
		
		{ stock ? 
			<SafeAreaView style={styles.safeAreaContainer}>
				<View style={styles.container}>
					<View style={styles.titleContainer}>
						{/* Placeholder: */}
						<EvilIcons name='chart' size={400} color='white' />
					</View>
					<View style={styles.bodyContainer}>
						<Text style={styles.activities}>Activities</Text>
						<View style={styles.activity}> 
							<Text style={styles.activityLeft}>{'Buy '}</Text>
							<Text style={styles.activityRight}>{'$100 '}</Text>
						</View>
						<View style={styles.activity}> 
							<Text style={styles.activityLeft}>{'Sell '}</Text>
							<Text style={styles.activityRight}>{'$100 '}</Text>
						</View>						
						<Text style={styles.company}> Company </Text>
						
						<Text style={styles.description}>{stock.description}</Text>
							

						<View style={styles.activity}> 
							<Text style={styles.activityLeft}>{'Sell '}</Text>
							<Text style={styles.activityRight}>{'$100 '}</Text>
						</View>						
						<View style={styles.buttons}>			
							<TouchableOpacity style={styles.button}	onPress={() => {navigation.navigate('Search')}}>
								Buy 
							</TouchableOpacity>
							<TouchableOpacity style={styles.button}	onPress={() => {
								navigation.navigate('TradeScreen', stock)
								}}>
								Sell
							</TouchableOpacity>		
						</View>			
					</View>
				</View>
			</SafeAreaView>
			:
			<Text> Loading</Text>
		}
		</ScrollView>
		
    )
}

export default StockDetail
