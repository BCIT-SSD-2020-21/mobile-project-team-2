import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import PositionListItem from './PositionListItem';


export default function PositionList({ navigation, positions }) {
    return (
        <View> 
            {   positions?.length > 1 ?
                positions.map((position, index) => 
                    <PositionListItem key={index} position={position} navigation={navigation} />
                )
                :
                <TouchableOpacity style={styles.container}>
                <Text style={styles.symbol}>
                    {'No stocks in your portfolio at this time.'}
                </Text>
            </TouchableOpacity>
            }
        </View>
    )
}

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
    symbol: {
        textAlign: 'center',
        paddingHorizontal: 40,
        paddingVertical: 10,
        fontSize: 18,
        fontStyle: 'italic',
        color: '#cbdae466', //
    },
});