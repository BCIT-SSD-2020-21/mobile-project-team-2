import React from 'react'
import { Text, View } from 'react-native';
import { priceStyles } from '../../styles/fontStyles';

export default function PriceAmount({ label, amount }) {

    const integerAmount = amount ? `${Math.round(amount).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}` : (0).toFixed(0)
    const decimalAmount = amount ? (amount.toFixed(0)%amount).toFixed(2).substring(1,4) : (0).toFixed(2).substring(1,4)

    return (
        <View style={priceStyles.container}> 
            <Text style={priceStyles.label}>{`${label}: `}</Text>
            <View style={priceStyles.amountBox}>
                <Text style={priceStyles.currencySymbol}>
                    {'$'}
                </Text>
                <Text style={priceStyles.integer}>
                    {integerAmount ? integerAmount : ''}
                </Text>
                <Text style={priceStyles.decimal}>
                    {decimalAmount ? decimalAmount : ''}
                </Text>
            </View>
        </View>
    )
}
