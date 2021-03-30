import React from 'react'
import { StyleSheet, SafeAreaView, View, FlatList, TouchableOpacity, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
	container: {
      flex: 1
    }
});

export default function Market() {
    return (
        <SafeAreaView style={styles.container}>
            <Text>Market Screen</Text>
						<ScrollView>
							<Text>DCN</Text>
						</ScrollView>
						<View>
							<Text>Stock Details</Text>
						</View>
        </SafeAreaView>
    )
}
