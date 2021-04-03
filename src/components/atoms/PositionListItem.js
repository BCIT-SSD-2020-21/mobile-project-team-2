import React, {useState, useEffect} from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
// import { useEffect } from 'react/cjs/react.development';
import { getStockProfile, getStockQuote } from '../../api/stockapi';
import {firebase} from '../../firebase/config';

export default function PositionListItem({onPress, positionId, navigation}) {

    // console.log("Position: positionId PROP: ", positionId)

    const [loaded, setLoaded] = useState(false)
    
    // const [stockSymbol, setStockSymbol] = useState(symbol)
    const [position, setPosition] = useState({})
    const [stockDescription, setStockDescription] = useState("")
    const [currentPrice, setCurrentPrice] = useState("")

    	// GET THE USER OBJECT (contains cashOnHand, Watchlist, OwnedStocksList)
    function fetchPosition() {
          if (positionId) {
              // (firestoreDB) ref=collection, get user obj via onSnapshot, where id=positionId
              const ref = firebase.firestore().collection('positions').doc(positionId)
              ref.onSnapshot((doc) => {
                  console.log("current data: ", doc.data());
                  setPosition(doc.data());
              });
          }
    }
    useEffect(() => {
      fetchPosition();
    }, [])
    console.log("position: ", position);
    useEffect(() => {
      if (position?.symbol) {
        (async () => {
          const profileResult = await getStockProfile(position?.symbol);
          console.log('profileResult: ', profileResult)
          setStockDescription(profileResult.name)
        })();
      }
    }, [position])
    useEffect(() => {
      if (position?.symbol) {
        (async () => {
          const quoteResult = await getStockQuote(position?.symbol);
          console.log('quoteResult: ', quoteResult)
          setCurrentPrice(quoteResult.c)
        })();
      }
    }, [position])

    function toStockDetail() {
      if (position) {
        navigation.navigate('StockDetail', position?.symbol)
      }
    }

    console.log("position: ", position);
    return (
        // REVIEW API Response Data
    <TouchableOpacity style={styles.itemContainer} onPress={() => toStockDetail()}>
        <View style={styles.itemInfoSection}>
            <Text style={styles.itemSymbol}>{position?.symbol}</Text>
            <Text style={styles.itemDescription}>{stockDescription}</Text>
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