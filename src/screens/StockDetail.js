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
	ScrollView,
	Linking
} from 'react-native';
import { API_KEY, BASE_URL } from 'dotenv'
import axios from 'axios';
// import stockapi from '../api/stockapi'
import { EvilIcons } from '@expo/vector-icons';
import { firebase } from '../firebase/config';
import { getStockQuantity } from '../firebase/service';
import { getStockProfile, getStockQuote } from '../api/stockapi';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryStack, VictoryTheme } from 'victory-native'



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
        flex: 1
	},		
	titleContainer: {	
		width: '100%',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor:  '#147DF0',
		position: 'relative',	
	},	
	watch : {
		position: 'absolute',
		top: 0,
		right: 0,
		width: 50,
		height: 50,
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
		fontSize: 26,
		marginVertical: 10,
	},
    itemInfoSection: {

		width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
		alignItems: 'center',
		borderBottomWidth: 1,
		borderBottomColor: '#555555',
    },
    itemSymbol: {
      fontSize: 28,
      fontWeight: "bold",
    //   alignSelf: "flex-start",
      textTransform: "uppercase"
    },
    itemDescription: {
        fontSize: 24,
        color: "#000",
        // alignSelf: "flex-start",
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
		fontSize: 30,
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
		marginVertical: 10,
	},	
    buttonLeft: {
		backgroundColor:  '#147DF0',
		alignItems: 'center',
		justifyContent: 'center',
		width: '50%',
		padding: 4,
		marginLeft: 0,
		marginHorizontal: 10,
    },	
    buttonRight: {
		backgroundColor:  '#147DF0',
		alignItems: 'center',
		justifyContent: 'center',
		width: '50%',
		padding: 4,
		marginRight: 0,
		marginHorizontal: 10,		
    },	
    buttonText: {

		color: 'white',
		fontSize: 20, 
		height: 30, 
    },		
  card : {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  cardHeader : {
    fontSize: 16,
    fontWeight: 'bold'

  },
  cardDetail : {
    fontSize: 16,
    marginLeft: 10

  },

});

const StockDetail = ({ route, navigation}) => {
	//  const {symbol} = route.params
	const [symbol, setSymbol] = useState(route.params)
	const [stock, setStock] = useState({})
	const [error, setError] = useState('')
	const [currentPrice, setCurrentPrice] = useState(null)
	const [stockProfile, setStockProfile] = useState({})	
	const [stockQuote, setStockQuote] = useState({})
	const [position, setPosition] = useState(false)

    useEffect( () => {
		(async() => {
			if (symbol) {
				const profileResult = await getStockProfile(symbol);
				console.log('StockDetail, profileResult: ', profileResult)
				setStockProfile(profileResult)

				const quoteResult = await getStockQuote(symbol);
				console.log('StockDetail, quoteResult : ', quoteResult)
				setStockQuote(quoteResult)			
		}})()
	  }, [symbol])

	useEffect(() => {
		// find if the current user has the stock

		const userUID = firebase.auth().currentUser.uid
		// get user document by user UID; setUser		
		const userDoc = firebase.firestore().collection('users')
						.doc(userUID)
						.onSnapshot((doc) => {
							const {positions} = doc?.data()
							positions?.map( positionId => {  
								const positions = firebase.firestore().collection('positions')
									.doc(positionId)
									.onSnapshot((doc) => {
										if (doc?.data().symbol === symbol && doc?.data().quantity > 0) 
										{ 
											setPosition(true) 
											console.log("position", doc.data())
										}							
									})
								
							})
						})
						
					
	
		
	},[])	  

	    const toTrade = () => {
		  if (symbol) {
			navigation.navigate('Trade', symbol)
		}
	    }
	  	const toTradeBuyStock = () => {
			if (symbol) {
				const params = {
					symbol: symbol,
					type: 'buy',
				}
				navigation.navigate('Trade', params)
			}
		}
		const toTradeSaleStock = () => {
			if (symbol) {
				const params = {
					symbol: symbol,
					type: 'sell',
				}
				navigation.navigate('Trade', params)
			}
		}	

		const toAddWatch = () => {
			const userUID = firebase.auth().currentUser.uid
			console.log('toAddWatch userUID:', userUID)
			const userRef = firebase.firestore().collection('users').doc(userUID)
			userRef.update({
				watchList: firebase.firestore.FieldValue.arrayUnion(symbol)
			});

		}
        
        // Sample request from Finnhub
        // const request = require('request')

        // request('https://finnhub.io/api/v1/stock/candle?symbol=AAPL&resolution=5&from=1615298999&to=1615302599&token=c1hkcon48v6q1s3o2kmg', { json: true }, (err, res, body) => {
        // if (err) { return console.log(err) }
        // console.log(body.url)
        // console.log(body.explanation)
        // })

        // Sample data from Victory
        const data2017 = [
            {quarter: 1, earnings: 29000},
            {quarter: 2, earnings: 16500},
            {quarter: 3, earnings: 14250},
            {quarter: 4, earnings: 19000}
          ];
          const data2018 = [
            {quarter: 1, earnings: 17000},
            {quarter: 2, earnings: 11500},
            {quarter: 3, earnings: 16800},
            {quarter: 4, earnings: 13000}
          ];
          const data2019= [
            {quarter: 1, earnings: 13500},
            {quarter: 2, earnings: 11550},
            {quarter: 3, earnings: 18950},
            {quarter: 4, earnings: 15070}
          ];
          const data2020 = [
            {quarter: 1, earnings: 11001},
            {quarter: 2, earnings: 14510},
            {quarter: 3, earnings: 17150},
            {quarter: 4, earnings: 14960}
          ];

	// console.log("StocKDetial, route: ", route.params)
	console.log("StocKDetial, symbol: ", symbol)
	console.log("StocKDetial, stockProfile: ", stockProfile)
	console.log("StocKDetial, stockQuote: ", stockQuote)
	console.log("user position: ", position)	
	
    return (
		<ScrollView contentContainerStyle ={styles.scrollContainer}>

            
	
			<SafeAreaView style={styles.safeAreaContainer}>
				<View style={styles.container}>
					<View style={styles.titleContainer}>
						<TouchableOpacity style={styles.watch} 	onPress={() => toAddWatch()}>
							<EvilIcons  name='eye' size={50} color='white' />
						</TouchableOpacity>
						<View style={styles.companyDefaultLogo}>
							<Text style={styles.companyLogoName}>{symbol}</Text>
						</View>
						<Text style={styles.companyName}>{stockProfile.name}</Text>
						<Text style={styles.portfolio}>{stockQuote?.c ? `$${parseFloat(stockQuote.c).toFixed(2)}`:""} {stockProfile?.currency} </Text>

						<View style={styles.container}>
                            <VictoryChart domainPadding={20} width={350} theme={VictoryTheme.material}>
                                <VictoryAxis tickValues={[ 1, 2, 3, 4 ]} tickFormat={[ "Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]} />
                                <VictoryAxis dependentAxis tickFormat={(x) => (`$${x / 1000}k`)} />
                                    <VictoryStack colorScale={"warm"}>
                                        <VictoryBar data={data2017} x="quarter" y="earnings" />
                                        <VictoryBar data={data2018} x="quarter" y="earnings" />
                                        <VictoryBar data={data2019} x="quarter" y="earnings" />
                                        <VictoryBar data={data2020} x="quarter" y="earnings" />
                                    </VictoryStack>
                            </VictoryChart>
                        </View>

                        {/* <EvilIcons name='chart' size={300} color='white' /> */}
					</View>
					<View style={styles.bodyContainer}>
						<View><Text style={styles.activities}>Stats</Text></View>	

						<View style={styles.itemInfoSection}>
							<Text style={styles.itemSymbol}>Open</Text>
							<Text style={styles.itemDescription}>{stockQuote?.o ? `$${parseFloat(stockQuote.o).toFixed(2)}`:""}</Text>
						</View>									

						<View style={styles.itemInfoSection}>
							<Text style={styles.itemSymbol}>High</Text>
							<Text style={styles.itemDescription}> {stockQuote?.h ? `$${parseFloat(stockQuote.h).toFixed(2)}`:""}</Text>
						</View>			

						<View style={styles.itemInfoSection}>
							<Text style={styles.itemSymbol}>Low</Text>
							<Text style={styles.itemDescription}>{stockQuote?.l ? `$${parseFloat(stockQuote.l).toFixed(2)}`:""}</Text>
						</View>	

						<View style={styles.itemInfoSection}>
							<Text style={styles.itemSymbol}>Exchange</Text>
							<Text style={{...styles.itemDescription, fontSize: 20, marginLeft: 20, maxWidth: '50%'}}>{stockProfile.exchange}</Text>
						</View>							

						 <View style={styles.company}> 				
							<Text style={styles.companyInfo} numberOfLines={1} >Company Info</Text>
							<Image style={styles.companyLogo} source={{ uri: stockProfile.logo}} />
						</View>
					
						<View style={styles.card}>
							<Text style={styles.cardHeader}>Exchange:</Text>
							<Text style={styles.cardDetail}>{stockProfile.exchange}</Text>
						</View>	

						<View style={styles.card}>
							<Text style={styles.cardHeader}>Industry:</Text>
							<Text style={styles.cardDetail}>{stockProfile.finnhubIndustry}</Text>
						</View>	

						<View style={styles.card}>
							<Text style={styles.cardHeader}>Country:</Text>
							<Text style={styles.cardDetail}>{stockProfile.country}</Text>
						</View>	
																	
						<View style={styles.card}>
							<Text style={styles.cardHeader}>IPO:</Text>
							<Text style={styles.cardDetail}>{stockProfile.ipo}</Text>
						</View>

						<View style={styles.card}>
							<Text style={styles.cardHeader}>Telephone:</Text>
							<Text style={styles.cardDetail}>{stockProfile.phone}</Text>
						</View>

						<View style={styles.card}>
							<Text style={styles.cardHeader}>IPO:</Text>
							<Text style={styles.cardDetail}>{stockProfile.ipo}</Text>
						</View>							

						<View style={styles.card}>
							<Text style={styles.cardHeader}>Market Capitalization:</Text>
							<Text style={styles.cardDetail}>{stockProfile.marketCapitalization}</Text>
						</View>							

						<View style={styles.card}>
							<Text style={styles.cardHeader}>Share Outstanding:</Text>
							<Text style={styles.cardDetail}>{stockProfile.shareOutstanding}</Text>
						</View>

						<View style={styles.card}>
							<Text style={styles.cardHeader}>Website:</Text>
							 <Text style={{color: 'blue'}}	onPress={() => {  Linking.openURL(stockProfile.weburl);  }}>
							Click here to open {stockProfile.name} Website
							</Text>
						</View>								

						<View style={styles.buttons}>			
							<TouchableOpacity style={styles.buttonLeft}	onPress={() => toTradeBuyStock()}>
								<Text style={styles.buttonText}	>{'Buy'}</Text> 
							</TouchableOpacity>
							<TouchableOpacity onPress={() => position && toTradeSaleStock()} disabled={!position} 
							style={{...styles.buttonLeft,  backgroundColor: position ? '#147DF0':'#555555'}} >
								<Text style={styles.buttonText}>{'Sell'}</Text>
							</TouchableOpacity>		
						</View>			 
					</View>
				</View>
			</SafeAreaView>
		</ScrollView>
    )
}

export default StockDetail
