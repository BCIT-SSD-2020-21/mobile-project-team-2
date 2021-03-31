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
	View
} from 'react-native';

const styles = StyleSheet.create({
	container: {
        flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: 100,
		fontFamily: 'Roboto',
    },
	image : {
		width:400, 
		height:400, 
	},	

	button: { 
		display: 'block',
		width: 300,
		backgroundColor: '#147DF0',
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
		<View>
			{/* an image placeholder for TODO task */}
			<Image style={styles.image}  />
			<View>
				<Text>{error}</Text>
				<Button style={styles.button} onPress={onSignout} 	title="Sign Out" />
			</View>		
		</View>
        </SafeAreaView>
    )
}
