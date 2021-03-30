import React, { useState } from 'react'
import * as firebase from 'firebase'
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
	const [error, setError] = useState('')
	const onSignout = () => {
		
		firebase.auth().signOut()
			.then((result) => {setError("sucess")})
			.catch((error) => {setError(error) })
	 }	 

    return (
        <SafeAreaView style={styles.container}>
            <Text>Portfolio Screen</Text>
						<Button style={styles.button} onPress={onSignout} title="Sign Out" />
        </SafeAreaView>
    )
}
