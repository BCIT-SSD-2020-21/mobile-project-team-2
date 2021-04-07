import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 0.4,
        borderLeftWidth: 0.2,
        borderColor: '#cbdae4',
        borderRadius: 5,
        padding: 5,
        marginBottom: 10,
        marginHorizontal: 10,
        backgroundColor: '#5584a466',
    },
    profile: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginVertical: 15,
    },
    symbol: {
        textAlign: 'left',
        fontSize: 24,
        fontWeight: "bold",
        textTransform: "uppercase",
        color: '#cbdae466', //
    },
    name: {
        textAlign: 'left',
        fontSize: 18,
        color: '#cbdae4', // white
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
        textTransform: "uppercase",
        color: '#f1e9d1BF', // white
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



    quantityBox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // width: '97%',
        padding: 4,
    }, 
    quantityLabel: {
        fontFamily: 'sans-serif',
        fontSize: 12,
        opacity: 0.8,
        fontStyle: 'italic',
        color: '#adcef7',
    },
    quantityValue: {
        fontFamily: 'sans-serif',
        opacity: 0.9,
        marginRight: 30,
        fontSize: 18,
        color: '#e2e2e9',
        transform: [{ rotate: "3deg" }]
    },


});

export default styles