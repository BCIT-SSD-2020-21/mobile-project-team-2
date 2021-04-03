import React, { useState, useEffect } from 'react'
import { View } from 'react-native'; // StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Text, TextInput, 
// import { firebase } from '../firebase/config';
// import { EvilIcons } from '@expo/vector-icons';
// import { getStockProfile, getStockQuote } from '../../api/stockapi';
// import { API_KEY, BASE_URL } from 'dotenv'
// import axios from 'axios';
import Position from './Position';

export default function PositionList({ positionsArray }) {

    console.log("positionsArray: ", positionsArray)
    return (
        <View> 
            {
                positionsArray?.map((prop, index) => {
                    return (
                        <Position key={index} positionId={prop} />
                    )
                })
            }
        </View>
    )
}
