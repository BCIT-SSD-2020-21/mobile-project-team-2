import React from 'react'
import {
	StyleSheet,
	SafeAreaView,
	ImageBackground,
	FlatList,
	TouchableOpacity,
	Text,
	Image,
} from 'react-native';

const styles = StyleSheet.create({
	container: {
        //
    }
});


const StockDetail = ({ route, navigation}) => {
	const { symbol } = route.params  
    return (
        <SafeAreaView style={styles.container}>
            <Text>{symbol}</Text>
        </SafeAreaView>
    )
}

export default StockDetail
