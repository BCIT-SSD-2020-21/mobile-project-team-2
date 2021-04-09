import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import StockListItem from './StockListItem';

export default function StockList({ navigation, stockArray }) {

    return (
        <View> 
            { stockArray?.length > 1 ?
                stockArray.map((prop, index) => 
                    <StockListItem key={index} symbol={prop} navigation={navigation} />
                )
                :
                <TouchableOpacity style={styles.container}>
                    <Text style={styles.symbol}>
                        {'No stocks in your watchlist at this time.'}
                    </Text>
                </TouchableOpacity>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 0.4,
        borderLeftWidth: 0.2,
        borderColor: '#cbdae4',
        borderRadius: 5,
        padding: 5,
        marginBottom: 10,
        marginHorizontal: 10,
        backgroundColor: '#5584a466',
    },
    symbol: {
        textAlign: 'center',
        paddingHorizontal: 40,
        paddingVertical: 10,
        fontSize: 18,
        fontStyle: 'italic',
        color: '#cbdae466', //
    },
});