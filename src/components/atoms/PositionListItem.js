import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, Text } from "react-native";
import { getStockProfile, getStockQuote } from '../../api/stockapi';
import styles from '../../styles/positionListStyles'
import PriceAmount from './PriceAmount';

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
			navigation.navigate('StockDetail', position.symbol)
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
                <PriceAmount label={'cur'} amount={stockQuote? stockQuote.c : 0} />
                <PriceAmount label={'var'} amount={priceVariance? priceVariance : 0} />
			</View>

			{/* total shares, current price, positionValue */}
			<View style={styles.position}>

                <PriceAmount label={'cost'} amount={position? position.averageCostPerShare : 0} />

				<View style={styles.quantityBox}>
					<Text style={styles.quantityLabel}>{'own: '}</Text>
					<Text style={styles.quantityValue}>
						{`${parseInt(position?.quantity).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`}
					</Text>
				</View>

                <PriceAmount label={'value'} amount={currentPositionValue? currentPositionValue : 0 } />

			</View>
		</TouchableOpacity>
    )
}