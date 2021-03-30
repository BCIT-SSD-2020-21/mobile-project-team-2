import React from 'react'
import {
	StyleSheet,
	SafeAreaView,
	Button,
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

export default function Portfolio({navigation}) {
    return (
        <SafeAreaView style={styles.container}>
            <Text>Portfolio Screen</Text>
						<Button style={styles.button} onPress={() => navigation.navigate('SignOut')} type="outline" title="Sign Out" />
        </SafeAreaView>
    )
}
