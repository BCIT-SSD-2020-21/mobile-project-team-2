import React, { useState } from 'react'
import {
	StyleSheet,
	SafeAreaView,
	Button,
	FlatList,
	TouchableOpacity,
	Text,
	Image,
	View
} from 'react-native';
import { firebase } from '../firebase/config';
import { EvilIcons } from '@expo/vector-icons';

const styles = StyleSheet.create({
	container: {
        flex: 1,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		// padding: 100,
		fontFamily: 'Roboto',
		backgroundColor: '#0f1d12', //dark-green
    },
	chartContainer: {
		width: '90%',
		minHeight: 300,
		height: '60%',
		maxHeight: 450,
		backgroundColor: '#182f1d',
	},
	chartIcon: {
		margin: 'auto',
		fontSize: 328,
		color: '#59a66b',
	},	
	image: {
		width:400, 
		height:400, 
	},
	button: { 
		display: 'block',
		width: '32%',
		margin: '0',
		// backgroundColor: '#147DF0',
		backgroundColor: '#59a66b', // medium-green
	}
});

export default function Portfolio({navigation}) {

	const entityRef = firebase.firestore().collection('entities')
	console.log('entityRef', entityRef)

    return (
        <SafeAreaView style={styles.container}>

				{/* Greeting */}
				<View style={styles.greetContainer}>
						{/* some indo from firebaseAuth */}
					<Text style={styles.greetHeader}>{``}</Text>
						{/* some info from firestoreDB */}
					<Text style={styles.greetSubheader}>{}</Text> 
				</View>
	
				{/* Chart (Vector??) - Timeline, Changes over last period (1 week? multiple options?)*/}
				<View style={styles.chartContainer}>
					{/* Placeholder: */}
					<EvilIcons style={styles.chartIcon} name='chart' size={30} color='black' />
				</View>

				<View style={styles.fundingContainer}>
					<Text style={styles.fundingLabel}>{'Available funding: '}</Text>
					<Text style={styles.fundingAmount}>{'$100,000'}</Text>
					{/* INITIALLY: 		Add $50,000 CASH 
							LATER: 		navigate() to new page?  */}
					<Button style={styles.fundingAction}></Button>

				</View>

				{/* Owned Stocks 
				  	-- FlatList, limit 6, top change in value */}
				<View style={styles.listingContainer}>
					<View style={styles.listingHeader}>
						<Text style={styles.listingTitle}>{'Portfolio'}</Text>
						{/* ->Click 'See All' --> navigate() to large FlatList (StockListScreen - takes as prop any list of Stocks ))  */}
						<Button style={styles.listingButton}>{'FULL LIST'}</Button>
					</View>
					  {/* List Item Placeholders: */}
					  <Text style={styles.listingItem}>{'AAAA - OwnedStock1'}</Text>
					  <Text style={styles.listingItem}>{'BBBB - OwnedStock2'}</Text>
					  <Text style={styles.listingItem}>{'CCCC - OwnedStock3'}</Text>
					  <Text style={styles.listingItem}>{'DDDD - OwnedStock4'}</Text>
				</View>	

				{/* Watchlist Stocks
				-- FlatList, limit 10, top change in value */}
				<View style={styles.listingContainer}>
					<View style={styles.listingHeader}>
						<Text style={styles.listingTitle}>{'Watchlist'}</Text>
						{/* ->Click 'See All' --> navigate() to large FlatList (StockListScreen) */}
						<Button style={styles.listingButton}>{'FULL LIST'}</Button>
					</View>
					<Text style={styles.listingItem}>{'AAA1 - WatchlistStock1'}</Text>
					<Text style={styles.listingItem}>{'BBB2 - WatchlistStock2'}</Text>
					<Text style={styles.listingItem}>{'CCC3 - WatchlistStock3'}</Text>
					<Text style={styles.listingItem}>{'DDD4 - WatchlistStock4'}</Text>
				</View>	

        </SafeAreaView>
    )
}
