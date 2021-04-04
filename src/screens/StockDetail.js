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
import { EvilIcons } from '@expo/vector-icons';
import { firebase } from '../firebase/config';



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
	companyDefaultLogo : {
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
		fontSize: 22,
		fontWeight: 'bold'
	  },	
	  portfolio : {
		color: '#fff',
		fontSize: 26,
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
	company: {
		display: 'flex',
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		marginVertical: 5,
	},	
	companyInfo : {
		fontSize: 36,
		marginVertical: 10,
	},
	companyLogo: {
		resizeMode: 'stretch',
		width: 36,
		height: 36,
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
  card : {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  cardHeader : {
    fontSize: 20,
    fontWeight: 'bold'

  },
  cardDetail : {
    fontSize: 20,
    marginLeft: 10

  },

});




const StockDetail = ({ route, navigation}) => {
	 const {symbol} = route.params
	 const [symbolVal, setSymbol] = useState(symbol??'' )
	const [profile2, setProfile2] = useState({})
	const [error, setError] = useState('')
	const [currentPrice, setCurrentPrice] = useState(null)
	const [quantity, setQuantity] = useState(null)
	const [portfolio, setPortfolio] = useState(null)	

	const getProfile = async ({ symbolVal }) => {
		try {
			// we choose the free endpoint profile2 instead of profile which requires premium
			const response = await axios.get(`${BASE_URL}/stock/profile2?symbol=${symbolVal}&token=${API_KEY}`)
			setProfile2(response.data)
		} catch (err) {
			console.error('API Call error:', err)
		}
	}

	const getCurrentPrice = async () => {
		try {
			const response = await axios.get(`${BASE_URL}/quote?symbol=${symbolVal}&token=${API_KEY}`)
			setCurrentPrice(response.data.c)
		} catch (err) {
			console.error('API Call error:', err)
		}
	}	

	useEffect(  () => {
		 getProfile({symbolVal})
		 getCurrentPrice({symbolVal})

		var {email} = firebase.auth().currentUser
		const users = firebase.firestore().collection('users')
		users.where('email', '==', email)
		.get()
		.then((snapShot) => {
			snapShot.forEach((doc) => {
				console.log(doc.id, " => ", doc.data());

				const {positions } = doc?.data()
				positions?.map( pos => {  
					const positions = firebase.firestore().collection('positions')
					positions.where(firebase.firestore.FieldPath.documentId(), "==", pos)
							.where("symbol", "==", symbol)
							.get()
							.then((snapShot) => {
								snapShot.forEach((doc) => {
									if(doc) {
										// console.log("good news", doc.data())
										const {quantity} = doc.data()
										// console.log("quantity", quantity)
										setQuantity(quantity)
									}
							})
						})									

					}) 			
			
			})
		})		
	},[])

	useEffect( () => {
			if(quantity && currentPrice) {
				const portfolio = quantity * currentPrice
				setPortfolio(portfolio)
			}
		},[currentPrice, quantity])									

    return (
		<ScrollView contentContainerStyle ={styles.scrollContainer}>
		
		{ !!profile2 ? 
			<SafeAreaView style={styles.safeAreaContainer}>
				<View style={styles.container}>
					<View style={styles.titleContainer}>
						<View style={styles.companyDefaultLogo}>
							<Text style={styles.companyLogoName}>{profile2.ticker}</Text>
						</View>
						<Text style={styles.companyName}>{profile2.name}</Text>
						<Text style={styles.portfolio}>$ {portfolio?.toFixed(2)} {profile2.currency}</Text>
						<EvilIcons name='chart' size={300} color='white' />
					</View>
					<View style={styles.bodyContainer}>
						<View><Text style={styles.activities}>Activities</Text></View>
						<View style={styles.activity}> 
							<Text style={styles.activityLeft}>{'Buy '}</Text>
							<Text style={styles.activityRight}>${`${currentPrice?.toFixed(2)}`}</Text>
						</View>
						<View style={styles.activity}> 
							<Text style={styles.activityLeft}>{'Sell '}</Text>
							<Text style={styles.activityRight}>${`${currentPrice?.toFixed(2)}`}</Text>
						</View>		
						<View style={styles.company}> 				
							<Text style={styles.companyInfo} numberOfLines={1} >Company Info</Text>
							<Image style={styles.companyLogo} source={{ uri: profile2.logo}} />
						</View>
					

						<View style={styles.card}>
							<Text style={styles.cardHeader}>Exchange:</Text>
							<Text style={styles.cardDetail}>{profile2.exchange}</Text>
						</View>						

						<View style={styles.card}>
							<Text style={styles.cardHeader}>IPO:</Text>
							<Text style={styles.cardDetail}>{profile2.ipo}</Text>
						</View>

						<View style={styles.card}>
							<Text style={styles.cardHeader}>Telephone:</Text>
							<Text style={styles.cardDetail}>{profile2.phone}</Text>
						</View>

						<View style={styles.card}>
							<Text style={styles.cardHeader}>IPO:</Text>
							<Text style={styles.cardDetail}>{profile2.ipo}</Text>
						</View>							

						<View style={styles.card}>
							<Text style={styles.cardHeader}>Market Capitalization:</Text>
							<Text style={styles.cardDetail}>{profile2.marketCapitalization}</Text>
						</View>							

						<View style={styles.card}>
						<Text style={styles.cardHeader}>Share Outstanding:</Text>
							<Text style={styles.cardDetail}>{profile2.shareOutstanding}</Text>
						</View>

						<View style={styles.card}>
							<Text style={styles.cardHeader}>Website:</Text>
							<Text style={{color: 'blue'}}
							onPress={() => {  Linking.openURL(weburl.url);  }}>
							Click Here to Open {profile2.name} Website
							</Text> 
						</View>							
  
			
	



					
						<View style={styles.buttons}>			
							<TouchableOpacity style={styles.buttonLeft}	onPress={() => {navigation.navigate('Trade')}}>
								<Text style={styles.buttonText}	>Buy</Text> 
							</TouchableOpacity>
							<TouchableOpacity style={styles.buttonRight}	onPress={() => {
								navigation.navigate('Trade', profile2)
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
