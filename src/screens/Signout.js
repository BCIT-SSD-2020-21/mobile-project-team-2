import React, { useState, useEffect } from 'react';
import {
	StyleSheet,
	SafeAreaView,
	ImageBackground,
	FlatList,
	TouchableOpacity,
	Text,
	Image,
	TextInput,
	Input,
	Button,

} from 'react-native';

import * as firebase from 'firebase'


const styles = StyleSheet.create({
	container: {
        flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: 100,
    },
	input : {
		width: 300,
		height: 40,
		fontSize:20,
		borderColor: '#9b9b9b',
		borderBottomWidth: 1,
		marginTop: 8,
		marginVertical: 15

	},
	button: { 
		width: 200,
		margin: 10,
	}
});

export default function Signout({navigation}) {
	const [error, setError] = useState('')

	const onSignout = () => {
		
		 firebase.auth().signOut()
		 	.then((result) => {setError("sucess")})
			 .catch((error) => {setError(""+error) })
	  }	  

    return (
        <SafeAreaView style={styles.container}>
			<Text>{error}</Text>
			<Button style={styles.button} onPress={onSignout} title="Sign Out" />
			
        </SafeAreaView>
    )
}


