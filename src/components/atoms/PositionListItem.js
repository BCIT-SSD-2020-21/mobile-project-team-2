import React, {useState, useEffect} from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
// import { useEffect } from 'react/cjs/react.development';
import { getStockProfile, getStockQuote } from '../../api/stockapi';
import {firebase} from '../../firebase/config';

export default function PositionListItem({onPress, position, navigation}) {
    const [loaded, setLoaded] = useState(false)
    const [stockDescription, setStockDescription] = useState("")
    const [currentPrice, setCurrentPrice] = useState("")

    useEffect(() => {
      if (position?.symbol) {
        (async () => {
          const profileResult = await getStockProfile(position?.symbol);
          setStockDescription(profileResult.name)
        })();
      }
    }, [position])
    useEffect(() => {
      if (position?.symbol) {
        (async () => {
          const quoteResult = await getStockQuote(position?.symbol);
          setCurrentPrice(quoteResult.c)
        })();
      }
    }, [position])

    function toStockDetail() {
      if (position) {
        navigation.navigate('StockDetail', position?.symbol)
      }
    }

    // console.log("position: ", position);
    return (
    <TouchableOpacity style={styles.itemContainer} onPress={() => toStockDetail()}>
        <View style={styles.itemInfoSection}>
          <Text style={styles.itemSymbol}>{position?.symbol}</Text>
          <Text style={styles.itemDescription}>{stockDescription}</Text>
        </View>
          <Text style={styles.currentPrice}>
            {`$${Math.round(currentPrice*100/100).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`}
          </Text>
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