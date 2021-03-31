import React from 'react'
import { View, Button, StyleSheet, TouchableOpacity, Text } from "react-native";

export default function StockListItem({onPress, item}) {
    return (
        // REVIEW API Response Data
    <TouchableOpacity onPress={onPress} style={styles.itemContainer}>
        <View style={styles.itemInfoSection}>
            <Text style={styles.itemSymbol}>{item.symbol}</Text>
            <Text style={styles.itemDescription}>{item.description}</Text>        
        </View>
        <View>
            <Text style={styles.currentPrice}>{item.price}</Text>
            <Text style={styles.priceDetail}>{item.price}</Text>
        </View>
    </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    // ...
    itemContainer: {
      display: 'flex',
      flexDirection: 'row',
    },
    itemInfoSection: {
        flexDirection: 'column',
    },
    itemSymbol: {
      fontSize: 32,
      fontWeight: "bold",
    //   alignSelf: "flex-start",
      textTransform: "uppercase"
    },
    itemDescription: {
        fontSize: 24,
        color: "#fff",
        // alignSelf: "flex-start",
    },
    currentPrice: {
        fontSize: 36,
        color: "#fff",
        fontWeight: "bold",
        // alignSelf: "flex-end",
        textTransform: "uppercase"
      },
      priceDetail: {
        fontSize: 18,
      }
  });