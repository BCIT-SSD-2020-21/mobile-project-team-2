import React from 'react'
import { View } from 'react-native';

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
