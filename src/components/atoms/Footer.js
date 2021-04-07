import React from 'react'
import { Text, View, StyleSheet } from 'react-native';
// import styles from '../../styles/portfolioStyles';

export default function Footer() {
    return (
        <View style={styles.container}>
            <Text style={styles.footerTextitem}>{'DiamondHands believes that ape together strong.'}</Text>
            <Text style={styles.footerTextitem}>{"Jump in, foo', we're going to the moon!"}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginTop: 60,
        paddingVertical: 40,
        paddingHorizontal: 30,
        backgroundColor: '#041529',
    },
    footerTextitem: {
        fontSize: 12,
        textAlign: 'center',
        paddingVertical: 10,
        color: '#cbdae466', //
    }
})