import React from 'react'
import { View } from 'react-native';
import StockListItem from './StockListItem';

export default function StockList({ navigation, stockArray }) {

    return (
        <View> 
            {
                stockArray?.map((prop, index) => 
                    <StockListItem key={index} symbol={prop} navigation={navigation} />
                )
            }
        </View>
    )
}
