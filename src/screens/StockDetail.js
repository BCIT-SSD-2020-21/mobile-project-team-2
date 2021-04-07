import React, {useState, useEffect} from 'react'
import { SafeAreaView, TouchableOpacity, Text, Image, View, ScrollView, Linking, ImageBackground, StatusBar } from 'react-native';
import { firebase } from '../firebase/config';
import { getStockProfile, getStockQuote } from '../api/stockapi';
import styles from '../styles/stockDetailsStyles'
import { VictoryBar, VictoryChart, VictoryAxis, VictoryStack, VictoryTheme, VictoryArea } from 'victory-native'
import { Watch, WatchOff } from "../icons/Watch";
import HeaderValue from '../components/atoms/HeaderValue';

const StockDetail = ({ route, navigation}) => {

	//  const {symbol} = route.params
	const [symbol, setSymbol] = useState(route.params)
	const [stockProfile, setStockProfile] = useState({})	
	const [stockQuote, setStockQuote] = useState({})
	const [position, setPosition] = useState(false)
    const [watch, setWatch] = useState(false)

    const [portfolioValueDifference, setPortfolioValueDifference] = useState(-34.25);
    const [portfolioValueSnapshots, setPortfolioValueSnapshots] = useState([])

    // Add Fake Data - to render victory chart
    useState(() => {
        let timestamp = 1000
        let portValue = 4000
        let snapshots = []
        for (var i = 0; i < 14; i++) {
            portValue = portValue + (Math.random() -0.5) * 3000
            timestamp = timestamp - 1
            snapshots.push({x: timestamp, y: portValue })
        }
        setPortfolioValueSnapshots(snapshots)
        
    }, [])

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

	// console.log("StocKDetial, route: ", route.params)
	console.log("StocKDetial, symbol: ", symbol)
	console.log("StocKDetial, stockProfile: ", stockProfile)
	console.log("StocKDetial, stockQuote: ", stockQuote)
	console.log("user position: ", position)	
	
    return (
		<ScrollView contentContainerStyle ={styles.scrollContainer}>
            <ImageBackground style={styles.background} source={{ uri: 'https://images.unsplash.com/photo-1520269604827-3a85b49d6c76?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=673&q=80' }}>
                <SafeAreaView style={styles.safeAreaContainer}>
                <StatusBar backgroundColor="white" barStyle="light-content"/>
                    <View style={styles.container}>
                        <View style={styles.titleContainer}>
                            <TouchableOpacity style={styles.watch} 	onPress={() => toAddWatch(watch)}>
                                {watch ? <Watch /> : <WatchOff />}
                            </TouchableOpacity>
                            <View style={styles.companyDefaultLogo}>
                            <Image style={styles.companyLogo} source={{ uri: stockProfile.logo}}/>
                                {/* <Text style={styles.companyLogoName}>{symbol}</Text> */}
                            </View>
                            <Text style={styles.companyName}>{stockProfile.name}</Text>
                            <Text style={styles.portfolio}>{stockQuote?.c ? `$${parseFloat(stockQuote.c).toFixed(2)}`:""} {stockProfile?.currency} </Text>

                            <View style={styles.container}>
                                {/* Chart */}
                                { portfolioValueSnapshots?.length > 2 &&
                                    <VictoryChart domainPadding={20} height={300} width={500} theme={VictoryTheme.material}>
                                        <VictoryAxis style={{ grid: {stroke: "#818e99", strokeWidth: 1.5 }}}/>
                                            <VictoryArea style={{ grid: 0, data: {stroke: '#cbdae4', fill: '#5584a466'}, }}
                                                data={portfolioValueSnapshots}/>
                                    </VictoryChart>
                                }   
                            </View>
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
                                <Text style={{...styles.itemDescription, fontSize: 15, marginLeft: 10, maxWidth: '70%'}}>{stockProfile.exchange}</Text>
                            </View>							

                            <View style={styles.company}>
                                {/* <Image style={styles.companyLogo} source={{ uri: stockProfile.logo}}/>				 */}
                                <Text style={styles.companyInfo} numberOfLines={1}>Company Info&nbsp;</Text> 
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
                                <Text style={styles.cardHeader}>Website:  </Text>
                                <Text style={{color: '#9A7D0A'}} onPress={() => Linking.openURL(stockProfile.weburl)}>
                                Visit {stockProfile.name}'s Website
                                </Text>
                            </View>								

                            <View style={styles.buttons}>			
                                <TouchableOpacity style={styles.buttonLeft}	onPress={() => toTradeBuyStock()}>
                                    <Text style={styles.buttonText}>Buy</Text> 
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => position && toTradeSaleStock()} disabled={!position} 
                                style={{...styles.buttonLeft, display: position ? 'block' : 'none', backgroundColor: position ? '#5584a466':'#555555'}} >
                                    <Text style={styles.buttonText}>Sell</Text>
                                </TouchableOpacity>		
                            </View>			 
                        </View>
                    </View>
                </SafeAreaView>
            </ImageBackground>
		</ScrollView>
    )
}

export default StockDetail
