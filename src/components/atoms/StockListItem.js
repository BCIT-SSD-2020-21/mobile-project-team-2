import React, {useState, useEffect} from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
// import { useEffect } from 'react/cjs/react.development';
import { getStockProfile, getStockQuote } from '../../api/stockapi';

export default function StockListItem({onPress, symbol}) {

    const [loaded, setLoaded] = useState(false)
    // const [stockSymbol, setStockSymbol] = useState(symbol)
    const [description, setDescription] = useState("")
    const [currentPrice, setCurrentPrice] = useState("")
    useEffect(() => {
      if (symbol) {
        (async () => {
          const profileResult = await getStockProfile(symbol);
          // console.log('profileResult: ', profileResult)
          setDescription(profileResult.name)
        })();
      }
    }, [])

    useEffect(() => {
      if (symbol) {
        (async () => {
          const quoteResult = await getStockQuote(symbol);
          // console.log('quoteResult: ', quoteResult)
          setCurrentPrice(quoteResult.c)
        })();
      }
    }, [])

    return (
        // REVIEW API Response Data
    <TouchableOpacity style={styles.itemContainer}>
        <View style={styles.itemInfoSection}>
            <Text style={styles.itemSymbol}>{symbol}</Text>
            <Text style={styles.itemDescription}>{description}</Text>
        </View>
        {/* <View> */}
            {/* { currentPrice &&  */}
              <Text style={styles.currentPrice}>{`$${Math.round(currentPrice*100/100).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`}</Text>
            {/* } */}
        {/* </View> */}
    </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    // ...
    itemContainer: {
      // marginTop: 5,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    itemInfoSection: {
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    itemSymbol: {
      fontSize: 32,
      fontWeight: "bold",
    //   alignSelf: "flex-start",
      textTransform: "uppercase"
    },
    itemDescription: {
        fontSize: 24,
        color: "#000",
        // alignSelf: "flex-start",
    },
    currentPrice: {
        fontSize: 36,
        color: "#000",
        fontWeight: "bold",
        // alignSelf: "flex-end",
        textTransform: "uppercase"
      },
      priceDetail: {
        fontSize: 18,
      }
  });