import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import SearchListItem from './SearchListItem';

export default function SearchList({ navigation, stocks }) {

    

    // console.log("SearchList, stocks: ", stocks)
    return (
		<ScrollView styles={styles.stockList}>
			{stocks.map((stock, index ) => (

                <SearchListItem key={index} stock={stock} navigation={navigation} />
			))}
		</ScrollView>
    )
}

const styles = StyleSheet.create({
	stockList: {
		height: 200,
	},
})



