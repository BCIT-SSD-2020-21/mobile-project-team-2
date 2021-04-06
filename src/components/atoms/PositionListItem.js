import React, {useState, useEffect} from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
// import { useEffect } from 'react/cjs/react.development';
import { getStockProfile, getStockQuote } from '../../api/stockapi';
import {firebase} from '../../firebase/config';

export default function PositionListItem({onPress, position, navigation}) {
    const [loaded, setLoaded] = useState(false)
    const [stockProfile, setStockProfile] = useState("")
    const [stockQuote, setStockQuote] = useState("")
    const [currentPositionValue, setCurrentPositionValue] = useState(0)

    useEffect(() => {
      if (position?.symbol) {
        (async () => {
          const profileResult = await getStockProfile(position?.symbol);
          setStockProfile(profileResult)
        })();
      }
    }, [position])
    useEffect(() => {
      if (position?.symbol) {
        (async () => {
          const quoteResult = await getStockQuote(position?.symbol);
          setStockQuote(quoteResult)
        })();
      }
    }, [position])
    useEffect(() => {
      setCurrentPositionValue(stockQuote.c*position.quantity)
    }, [stockQuote])

    function toStockDetail() {
      if (position) {
        navigation.navigate('StockDetail', position?.symbol)
      }
    }

    // console.log("position: ", position);
    return (
    <TouchableOpacity style={styles.container} onPress={() => toStockDetail()}>
        <View style={styles.profile}>
          <Text style={styles.symbol}>{position?.symbol}</Text>
          <Text style={styles.name}>{stockProfile.name}</Text>
        </View>
        <View style={styles.amounts}>
          <Text style={styles.price}>
            {`$${Math.round(stockQuote.c).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`}
          </Text>
          <Text style={styles.positionValue}>
            {`$${Math.round(currentPositionValue).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`}
          </Text>
        </View>
    </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    profile: {
      flexDirection: 'column',
      justifyContent: 'space-around',
    },
    symbol: {
      fontSize: 32,
      fontWeight: "bold",
      textTransform: "uppercase"
    },
    name: {
      fontSize: 24,
      color: "#000",
    },
    amounts: {
      flexDirection: 'column',
      justifyContent: 'space-around',
    },
    price: {
      fontSize: 32,
      textAlign: 'right',
      color: "#000",
      textTransform: "uppercase"
    },
    positionValue: {
      fontSize: 24,
      textAlign: 'right',
      color: "#000",
      textTransform: "uppercase"
    },
    // priceDetail: {
    //   fontSize: 18,
    // }
  });