import React, {useState, useEffect} from 'react'
import { SafeAreaView, TouchableOpacity, Text, Image, View, ScrollView, Linking } from 'react-native';
import { firebase } from '../firebase/config';
import { getStockProfile, getStockQuote } from '../api/stockapi';
import styles from '../styles/stockDetailsStyles'
import { VictoryBar, VictoryChart, VictoryAxis, VictoryStack, VictoryTheme } from 'victory-native'
import { Watch, WatchOff } from "../icons/Watch";

const StockDetail = ({ route, navigation}) => {

	//  const {symbol} = route.params
	const [symbol, setSymbol] = useState(route.params)
	const [stockProfile, setStockProfile] = useState({})	
	const [stockQuote, setStockQuote] = useState({})
	const [position, setPosition] = useState(false)
    const [watch, setWatch] = useState(false)

    useEffect(() => {
		(async() => {
			if (symbol) {
				const profileResult = await getStockProfile(symbol);
				console.log('StockDetail, profileResult: ', profileResult)
				setStockProfile(profileResult)

				const quoteResult = await getStockQuote(symbol);
				console.log('StockDetail, quoteResult : ', quoteResult)
				setStockQuote(quoteResult)			
			}
		})()
	}, [symbol])
	    

	useEffect(() => {
		// find if the current user has the stock

		const userUID = firebase.auth().currentUser.uid
		// get user document by user UID; setUser	
         console.log("position userUID", userUID)	
		const userDoc = firebase.firestore().collection('users')
            .doc(userUID)
            .onSnapshot((doc) => {
                const {positions, watchlist} = doc?.data()

                // detech position on this stock
                positions?.map( positionId => {  
                    const positions = firebase.firestore().collection('positions')
                        .doc(positionId)
                        .onSnapshot((doc) => {
                            if (doc && doc.data() && (doc.data().symbol === symbol && doc.data().quantity > 0)) 
                            { 
                                setPosition(true) 
                                console.log("position", doc?.data())
                            }							
                        })
                    
                })

                // detech the user watch on this stock
                console.log("watchlist", watchlist)
                if(watchlist && watchlist.includes(symbol)) {
                    setWatch(true)
                }              
            })	
	},[])	  

    function toTradeBuyStock() {
        if (symbol) {
            const params = {
                symbol: symbol,
                type: 'buy',
            }
            navigation.navigate('Trade', params)
        }
    }

    function toTradeSaleStock() {
        if (symbol) {
            const params = {
                symbol: symbol,
                type: 'sell',
            }
            navigation.navigate('Trade', params)
        }
    }

    function toAddWatch() {
        try {
            const userUID = firebase.auth().currentUser?.uid
            if(userUID) {
                console.log('toAddWatch userUID:', userUID)
                console.log('toAddWatch symbol:', symbol)
                const userRef = firebase.firestore().collection('users').doc(userUID)
                userRef.update({
                    watchlist: watch ? firebase.firestore.FieldValue.arrayRemove(symbol) : firebase.firestore.FieldValue.arrayUnion(symbol)
                });
                setWatch(!watch)
            }
        } catch(err) {
            console.log(err)
        }
	}	
        
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
						<TouchableOpacity style={styles.watch} 	onPress={() => toAddWatch(watch)}>
							{watch ? <Watch /> : <WatchOff />}
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
							<Text style={styles.companyInfo} numberOfLines={1}>Company Info&nbsp;</Text>
							<Image style={styles.companyLogo} source={{ uri: stockProfile.logo}}/>
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
							<Text style={styles.cardHeader}>Market Capitalization:</Text>
							<Text style={styles.cardDetail}>{stockProfile.marketCapitalization}</Text>
						</View>							

						<View style={styles.card}>
							<Text style={styles.cardHeader}>Share Outstanding:</Text>
							<Text style={styles.cardDetail}>{stockProfile.shareOutstanding}</Text>
						</View>

						<View style={styles.card}>
							<Text style={styles.cardHeader}>Website:</Text>
							<Text style={{color: 'blue'}} onPress={() => Linking.openURL(stockProfile.weburl)}>
							 Click here to open {stockProfile.name} Website
							</Text>
						</View>								

						<View style={styles.buttons}>			
							<TouchableOpacity style={styles.buttonLeft}	onPress={() => toTradeBuyStock()}>
								<Text style={styles.buttonText}>Buy</Text> 
							</TouchableOpacity>
							<TouchableOpacity onPress={() => position && toTradeSaleStock()} disabled={!position} 
							style={{...styles.buttonLeft, backgroundColor: position ? '#147DF0':'#555555'}} >
								<Text style={styles.buttonText}>Sell</Text>
							</TouchableOpacity>		
						</View>			 
					</View>
				</View>
			</SafeAreaView>
		</ScrollView>
    )
}

export default StockDetail
