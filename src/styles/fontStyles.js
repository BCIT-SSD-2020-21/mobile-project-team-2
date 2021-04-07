
import { StyleSheet } from 'react-native';
import { RotationGestureHandler } from 'react-native-gesture-handler';


export const stockListItem = StyleSheet.create({
    // stockListItem

})

export const walletStyles = StyleSheet.create({
    //  WALLET STYLING
    wallet: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        width: '97%',
        padding: 4,

    }, 
    walletLabel: {
        fontFamily: 'sans-serif',
        fontSize: 18,
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
        fontFamily: 'sans-serif',
        fontSize: 18,
        fontWeight: 'bold',
        fontStyle: 'italic',
        opacity: 0.6,
        marginBottom: 8,
        color: '#777698',
        transform: [
            { rotateX: "10deg" },
            { rotateZ: "-55deg" },
            { translateX: 2 },
            { translateY: 7 }
        ]
    },
    walletAmountInteger: {
        fontFamily: 'sans-serif',
        opacity: 0.9,
        fontSize: 38,
        color: '#e2e2e9',
        transform: [{ rotate: "3deg" }]
    },
    walletAmountDecimal: {
        fontFamily: 'sans-serif',
        opacity: 0.8,
        fontSize: 22,
        color: '#e2e2e9',
        marginRight: 4,
        marginBottom: 6.5,
        transform: [
            { rotate: "7deg" },
            { translateX: -6 }
        ]
    }
});