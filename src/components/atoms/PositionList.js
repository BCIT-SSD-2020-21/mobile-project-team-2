import React from 'react'
import { View } from 'react-native';
import PositionListItem from './PositionListItem';

export default function PositionList({ navigation, positions }) {
    return (
        <View> 
            {
                positions.map((position, index) => 
                    <PositionListItem key={index} position={position} navigation={navigation} />
                )
            }
        </View>
    )
}
