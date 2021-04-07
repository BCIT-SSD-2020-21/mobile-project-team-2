import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, Text } from "react-native";
import { getStockProfile, getStockQuote } from '../../api/stockapi';
import styles from '../../styles/positionListStyles'

export default function PositionListItem({ position, navigation}) {
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

			(async () => {
				const quoteResult = await getStockQuote(position?.symbol);
				setStockQuote(quoteResult)
			})();
		}
    }, [position])

    useEffect(() => {
        setCurrentPositionValue(stockQuote?.c * position?.quantity)
        setPriceVariance(stockQuote.c - position.averageCostPerShare)
    }, [stockQuote])

    const toStockDetail = () => {
		if (position) {
			navigation.navigate('StockDetail', position?.symbol)
		}
    }

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
						{stockQuote ? `$${Math.round(stockQuote?.c).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`: ''}
					</Text>
					<Text style={styles.currentPriceDecimal}>
						{stockQuote ? `${(stockQuote?.c.toFixed(0)%stockQuote?.c).toFixed(2).substring(1,4)}` : ''}
					</Text>
				</View>

				<View style={styles.positionCenter}>
					<Text style={styles.label}>{'var: '}</Text>
					<Text style={styles.priceVariance}>
						{`$${Math.round(priceVariance).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`}
					</Text>
				</View>
			</View>

			{/* total shares, current price, positionValue */}
			<View style={styles.position}>
				{/* Center */}
				<View style={styles.positionRight}>
					 <Text style={styles.label}>{'avg cost: '}</Text>
					<Text style={styles.averageCost}>
						{`$${Math.round(position.averageCostPerShare).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`}
					</Text>
					{/* <Text style={styles.averageCost}>
						{`$${(position.averageCostPerShare.toFixed(2)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`}
					</Text> */}
				</View>

				<View style={styles.positionRight}>
					<Text style={styles.label}>{'own: '}</Text>
					<Text style={styles.quantityValue}>
						{`${parseInt(position?.quantity).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`}
					</Text>
				</View>

				<View style={styles.positionRight}>
					<Text style={styles.label}>{'value: '}</Text>
					<Text style={styles.positionValue}>
						{`$${Math.round(currentPositionValue).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`}
					</Text>
				</View>
			</View>
		</TouchableOpacity>
    )
}