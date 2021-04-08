
import { StyleSheet } from 'react-native';
import { RotationGestureHandler } from 'react-native-gesture-handler';


export const headerValueStyles = StyleSheet.create({
    // portfolio values styles
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '97%',
        padding: 4,

    }, 
    label: {
        fontSize: 18,
        margin: 4,
        opacity: 0.8,
        fontStyle: 'italic',
        color: '#adcef7',
    },
    amountBox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    currencySymbol: {
        fontSize: 20,
        fontWeight: 'bold',
        fontStyle: 'italic',
        opacity: 0.6,
        marginBottom: 8,
        color: '#777698',
        transform: [
            // { rotateX: "10deg" },
            // { rotateZ: "-90deg" },
            { translateX: -2 },
            { translateY: 14 }
        ]
    },
    integer: {
        opacity: 0.9,
        fontSize: 38,
        color: '#e2e2e9',
        transform: [{ rotate: "3deg" }]
    },
    decimal: {
        opacity: 0.8,
        fontSize: 22,
        color: '#e2e2e9',
        marginRight: 4,
        marginBottom: 6.5,
        transform: [
            { rotate: "7deg" },
            { translateX: -2 }
        ]
    }
})

export const priceStyles = StyleSheet.create({
    // price values styles
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // width: '97%',
        padding: 4,

    }, 
    label: {
        fontSize: 12,
        margin: 4,
        opacity: 0.8,
        fontStyle: 'italic',
        color: '#adcef7',
    },
    amountBox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    currencySymbol: {
        fontSize: 18,
        fontWeight: 'bold',
        fontStyle: 'italic',
        opacity: 0.8,
        color: '#777698',
        transform: [
            // { rotateX: "10deg" },
            // { rotateZ: "-90deg" },
            { translateX: 0 },
            { translateY: 0 }
        ]
    },
    integer: {
        opacity: 0.9,
        fontSize: 18,
        color: '#e2e2e9',
        transform: [{ rotate: "3deg" }]
    },
    decimal: {
        opacity: 0.8,
        fontSize: 12,
        color: '#e2e2e9',
        marginRight: 4,
        marginBottom: 6.5,
        transform: [
            { rotate: "7deg" },
            { translateX: 0 }
        ]
    }
})

export const walletStyles = StyleSheet.create({
    //  WALLET STYLING
    wallet: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        width: '80%',
        padding: 4,

    }, 
    walletLabel: {
        fontSize: 16,
        margin: 4,
        opacity: 0.8,
        fontStyle: 'italic',
        color: '#adcef7',
    },
    walletAmount: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    walletAmountSymbol: {
        fontSize: 16,
        fontWeight: 'bold',
        fontStyle: 'italic',
        opacity: 0.6,
        marginBottom: 8,
        color: '#777698',
        transform: [
            // { rotateX: "10deg" },
            { rotateZ: "-90deg" },
            { translateX: -2 },
            { translateY: 10 }
        ]
    },
    walletAmountInteger: {
        opacity: 0.9,
        fontSize: 32,
        color: '#e2e2e9',
        transform: [{ rotate: "3deg" }]
    },
    walletAmountDecimal: {
        opacity: 0.8,
        fontSize: 16,
        color: '#e2e2e9',
        marginRight: 4,
        marginBottom: 6.5,
        transform: [
            { rotate: "7deg" },
            { translateX: 0 }
        ]
    }
});