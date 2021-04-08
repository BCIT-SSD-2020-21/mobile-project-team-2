import React from 'react'
import { Text, View } from 'react-native';
import { headerValueStyles } from '../../styles/fontStyles';


export default function HeaderValue({ label, amount }) {
    
    const roundedAmount = amount ? amount.toFixed(2) : 0
    const integerAmount = amount ? `${amount?.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}` : 0
    const decimalAmount = amount ? (roundedAmount.substring(roundedAmount.length-3,roundedAmount.length)) : (0).toFixed(2).substring(1,4)
    
    return (
        <View style={headerValueStyles.container}> 
            <Text style={headerValueStyles.label}>{`${label}: `}</Text>
            <View style={headerValueStyles.amountBox}>
                <Text style={headerValueStyles.currencySymbol}>
                    {'USD$'}
                </Text>
                <Text style={headerValueStyles.integer}>
                    {integerAmount ? integerAmount : ''}
                </Text>
                <Text style={headerValueStyles.decimal}>
                    {decimalAmount ? decimalAmount : ''}
                </Text>
            </View>
        </View>
    )
}
