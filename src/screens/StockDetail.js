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
// import stockapi from '../api/stockapi'
import { EvilIcons } from '@expo/vector-icons';
import { firebase } from '../firebase/config';
import { getStockQuantity } from '../firebase/service';
import { getStockProfile, getStockQuote } from '../api/stockapi';


const styles = StyleSheet.create({
	safeAreaContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
    },
	container: {	
		width: '100%',
		flexDirection: 'column',	
		justifyContent: 'center',
		alignItems: 'center',
	},		
	titleContainer: {	
		width: '100%',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor:  '#147DF0',
	},	
	companyLogo : {
		width: 60,
		height: 60,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',		
		borderRadius: 50,
		marginTop: 20,
		marginBottom: 10,
		backgroundColor:  '#606060',
	},
	companyLogoName: {
		color: '#fff',
		fontSize: 20,

		fontWeight: 'bold'
	  },	
	companyName: {
		color: '#fff',
		fontSize: 20,
		fontWeight: 'bold'
	  },	
	  portfolio : {
		color: '#fff',
		fontSize: 30,
		fontWeight: 'bold'
	  },	
	bodyContainer: {
		width: '80%',	
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
	},
	activities : {
		fontSize: 36,
		marginVertical: 10,
	},
	activity: {
		display: 'flex',
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginVertical: 5,
	},	
	activityLeft : {
		width: '60%',
		fontSize: 20,
	},
	activityRight : {
		fontSize: 20,
	},
	company : {
		fontSize: 36,
		marginVertical: 10,
	},
	description : {
		fontSize: 16,
		marginVertical: 5,
	},	
	buttons : {
		flex: 1,
		display: 'flex',
		width: "100%",
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginVertical: 5,
	},	
    buttonLeft: {
		backgroundColor:  '#147DF0',
		alignItems: 'center',
		justifyContent: 'center',
		width: '50%',
		padding: 5,
		marginLeft: 0,
		marginHorizontal: 10,
    },	
    buttonRight: {
		backgroundColor:  '#147DF0',
		alignItems: 'center',
		justifyContent: 'center',
		width: '50%',
		padding: 5,
		marginRight: 0,
		marginHorizontal: 10,		
    },	
    buttonText: {

		color: 'white',
		fontSize: 24, 
		height: 40, 
    },		



});

const StockDetail = ({ route, navigation}) => {
	//  const {symbol} = route.params
	 const [symbol, setSymbol] = useState(route.params)
	const [stock, setStock] = useState({})
	const [error, setError] = useState('')
	const [inited, setInited] = useState(false)
	const [currentPrice, setCurrentPrice] = useState(null)
	const [stockProfile, setStockProfile] = useState({})
	const [stockQuote, setStockQuote] = useState({})

	// const getProfile = async ({ symbolVal }) => {
	// 	try {
	// 		const response = await axios.get(`${BASE_URL}/stock/profile?symbol=${symbolVal}&token=${API_KEY}`)
	// 		setStock(response.data)
	// 	} catch (err) {
	// 		console.error('API Call error:', err)
	// 	}
	// }

	// const getCurrentPrice = async () => {
	// 	try {
	// 		const response = await axios.get(`${BASE_URL}/quote?symbol=${symbolVal}&token=${API_KEY}`)
	// 		setCurrentPrice(response.data.c)
	// 	} catch (err) {
	// 		console.error('API Call error:', err)
	// 	}
	// }	

	// useEffect( async () => {
	// 	await getProfile({symbolVal})
	// 	await getCurrentPrice({symbolVal})

	// 	var {email} = firebase.auth().currentUser
	// 	const quantity = await getStockQuantity({email, symbol: symbolVal})
	// 	console.log('quantity', quantity);
	// },[])
    useEffect(() => {
		if (symbol) {
		  (async () => {
			const profileResult = await getStockProfile(symbol);
			console.log('StockDetail, profileResult: ', profileResult)
			setStockProfile(profileResult)
		  })();
		}
	  }, [symbol])
	  useEffect(() => {
		if (symbol) {
		  (async () => {
			const quoteResult = await getStockQuote(symbol);
			console.log('StockDetail, quoteResult: ', quoteResult)
			setStockQuote(quoteResult)
		  })();
		}
	  }, [symbol])

	console.log("StocKDetial, route: ", route.params)
	console.log("StocKDetial, symbol: ", symbol)
	console.log("StocKDetial, stockProfile: ", stockProfile)
	console.log("StocKDetial, stockQuote: ", stockQuote)
    return (
		<ScrollView contentContainerStyle ={styles.scrollContainer}>
		
		{ stock ? 
			<SafeAreaView style={styles.safeAreaContainer}>
				<View style={styles.container}>
					<View style={styles.titleContainer}>
						<View style={styles.companyLogo}>
							<Text style={styles.companyLogoName}>DC</Text>
						</View>
						<Text style={styles.companyName}>DogeCoin, Inc.</Text>
						<Text style={styles.portfolio}>{'$xxx'}</Text>
						<EvilIcons name='chart' size={300} color='white' />
					</View>
					<View style={styles.bodyContainer}>
						<View><Text style={styles.activities}>Activities</Text></View>
						<View style={styles.activity}> 
							<Text style={styles.activityLeft}>{'Buy '}</Text>
							<Text style={styles.activityRight}>{`${currentPrice?.toFixed(2)}`}</Text>
						</View>
						<View style={styles.activity}> 
							<Text style={styles.activityLeft}>${'Sell '}</Text>
							<Text style={styles.activityRight}>${`${currentPrice?.toFixed(2)}`}</Text>
						</View>						
						<Text style={styles.company}>Company Info</Text>
						
						<View style={styles.description}><Text>{stock.description}</Text></View>							
					
						<View style={styles.buttons}>			
							<TouchableOpacity style={styles.buttonLeft}	onPress={() => {navigation.navigate('Trade')}}>
								<Text style={styles.buttonText}	>Buy</Text> 
							</TouchableOpacity>
							<TouchableOpacity style={styles.buttonRight}	onPress={() => {
								navigation.navigate('Trade', stock)
								}}>
								<Text style={styles.buttonText}	>Sell</Text>
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
