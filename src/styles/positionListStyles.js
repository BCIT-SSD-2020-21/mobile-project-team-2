import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1,
        margin: 2,
    },
    profile: {
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    symbol: {
        textAlign: 'left',
        fontSize: 24,
        fontWeight: "bold",
        textTransform: "uppercase"
    },
    
    name: {
        textAlign: 'left',
        fontSize: 18,
        color: "#000",
    },
    amounts: {
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    // center
    positionCenter: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    currentPrice: {
        fontSize: 20,
        textAlign: 'center',
        color: "#000",
        textTransform: "uppercase"
    },
    currentPriceDecimal: {
        fontSize: 14,
        textAlign: 'left',
        color: "#000",
        textTransform: "uppercase"
    },
    priceVariance: {
        fontSize: 16,
        textAlign: 'center',
        color: "#000",
        textTransform: "uppercase"
    },
    positionRight: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    label: {
        fontSize: 12,
        textAlign: 'left',
        fontStyle: 'italic',
    },
    quantityValue: {
        fontSize: 16,
        textAlign: 'right',
    },
    averageCost: {
        fontSize: 20,
        textAlign: 'right',
    },
    positionValue: {
        fontSize: 16,
        textAlign: 'right',
        color: "#000",
        textTransform: "uppercase"
    },
});

export default styles