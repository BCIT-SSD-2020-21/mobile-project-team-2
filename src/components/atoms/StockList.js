import React, { useState, useEffect } from 'react'
import { View } from 'react-native'; // StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Text, TextInput, 
// import { firebase } from '../firebase/config';
// import { EvilIcons } from '@expo/vector-icons';
// import { getStockProfile, getStockQuote } from '../../api/stockapi';
// import { API_KEY, BASE_URL } from 'dotenv'
// import axios from 'axios';
import StockListItem from './StockListItem';

export default function StockList({ navigation, stockArray }) {

    // console.log("stockArray", stockArray)
    return (
        <View> 
            {
                stockArray?.map((prop, index) => {
                    return (
                        <StockListItem key={index} symbol={prop} navigation={navigation} />
                    )
                })
            }
        </View>
    )
}
