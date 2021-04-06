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
    const [priceVariance, setPriceVariance] = useState(0)

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
        setCurrentPositionValue(stockQuote?.c*position.quantity)
        setPriceVariance(stockQuote.c - position.averageCostPerShare)
    }, [stockQuote])

    function toStockDetail() {
      if (position) {
         navigation.navigate('StockDetail', position?.symbol)
      }
    }

    // console.log("position: ", position);
    return (
    <TouchableOpacity style={styles.container} onPress={() => toStockDetail()}>
    
        {/* Left */}
        <View style={styles.profile}>
            <Text style={styles.symbol}>{position?.symbol}</Text>
            <Text style={styles.name}>{stockProfile.name}</Text>
        </View>

        {/* Center */}
        <View style={styles.variances}>

         <View style={styles.positionCenter}> 
            <Text style={styles.label}>{'price: '}</Text>
            <Text style={styles.currentPrice}>
                {stockQuote ? `$${Math.round(stockQuote?.c).toFixed(0).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`: ''}
            </Text>
            <Text style={styles.currentPriceDecimal}>
                {stockQuote ? `${(stockQuote?.c.toFixed(0)%stockQuote?.c).toFixed(2).toString().substring(1,4)}` : ''}
            </Text>
            </View>

        <View style={styles.positionCenter}>
          <Text style={styles.label}>{'var: '}</Text>
          <Text style={styles.priceVariance}>
            {`$${Math.round(priceVariance).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`}
          </Text>
          </View>
        </View>

        {/* total shares, current price, positionValue */}
        <View style={styles.position}>
          {/* Center */}
          
          <View style={styles.positionRight}>
            <Text style={styles.label}>{'avg cost: '}</Text>
            <Text style={styles.averageCost}>
                {`$${Math.round(position.averageCostPerShare).toFixed(0).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`}
            </Text>
            {/* <Text style={styles.averageCost}>
                {`$${(position.averageCostPerShare.toFixed(2)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`}
            </Text> */}
          </View>

          <View style={styles.positionRight}>
            <Text style={styles.label}>{'own: '}</Text>
            <Text style={styles.quantityValue}>
                {`${position.quantity.toFixed(0).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`}
            </Text>
          </View>

          <View style={styles.positionRight}>
            <Text style={styles.label}>{'value: '}</Text>
            <Text style={styles.positionValue}>
                {`$${Math.round(currentPositionValue).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`}
            </Text>
          </View>
        </View>
    </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderWidth: 1,
      margin: 2,
    },
    positionLeft: {

    },
    profile: {
      flexDirection: 'column',
      justifyContent: 'space-around',
    },
    symbol: {
      textAlign: 'left',
      fontSize: 24,
      fontWeight: "bold",
      textTransform: "uppercase"
    },
    
    name: {
      textAlign: 'left',
      fontSize: 18,
      color: "#000",
    },
    amounts: {
      flexDirection: 'column',
      justifyContent: 'space-around',
    },
    // center
    positionCenter: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    currentPrice: {
      fontSize: 20,
      textAlign: 'center',
      color: "#000",
      textTransform: "uppercase"
    },
    currentPriceDecimal: {
      fontSize: 14,
      textAlign: 'left',
      color: "#000",
      textTransform: "uppercase"
    },
    priceVariance: {
      fontSize: 16,
      textAlign: 'center',
      color: "#000",
      textTransform: "uppercase"
    },
    // right
    position: {

    },
    positionRight: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    label: {
      fontSize: 12,
      textAlign: 'left',
      fontStyle: 'italic',
    },
    quantityValue: {
      fontSize: 16,
      textAlign: 'right',
    },
    averageCost: {
      fontSize: 20,
      textAlign: 'right',
    },
    positionValue: {
      fontSize: 16,
      textAlign: 'right',
      color: "#000",
      textTransform: "uppercase"
    },
  });