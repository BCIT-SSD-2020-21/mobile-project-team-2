import React from 'react'
import { Text, View } from 'react-native';
import { walletStyles } from '../../styles/fontStyles';

import { StyleSheet } from 'react-native';

export default function WalletAmount({ label, amount }) {

    const integerAmount = `${Math.round(amount).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`
    const decimalAmount = amount ? (amount.toFixed(0)%amount).toFixed(2).substring(1,4) : (0).toFixed(2).substring(1,4)

    return (
        <View style={walletStyles.wallet}> 
            <Text style={walletStyles.walletLabel}>{`${label}: `}</Text>
            <View style={walletStyles.walletAmount}>
                <Text style={walletStyles.walletAmountSymbol}>
                    {'USD$'}
                </Text>
                <Text style={walletStyles.walletAmountInteger}>
                    {integerAmount ? integerAmount : ''}
                </Text>
                <Text style={walletStyles.walletAmountDecimal}>
                    {decimalAmount ? decimalAmount : ''}
                </Text>
            </View>
        </View>
    )
}