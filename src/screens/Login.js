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

export default function Login({navigation}) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] =  useState("");

	const onLogin = () => {
		firebase.auth().signInWithEmailAndPassword(email, password)
			.then((result) => {setError("sucess")})
			.catch((error) => {setError(""+error) })

			// test
			console.log(email)
			console.log(password)
	  	}	  

    return (
        <SafeAreaView style={styles.container}>
			<Text>{error}</Text>
			
			<TextInput style={styles.input} placeholder ="email" onChangeText={(email) => setEmail(email)} />
			<TextInput style={styles.input} placeholder ="password" onChangeText={(password) => setPassword(password)} />

			<Button style={styles.button} onPress={() => onLogin()} title="Login" />
			<Text> </Text>
			<Button style={styles.button} onPress={() => navigation.navigate('Register')} type="outline" title="Register" />
        </SafeAreaView>
    )
}


