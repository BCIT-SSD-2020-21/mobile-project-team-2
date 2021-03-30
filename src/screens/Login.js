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
	LogBox,
	View

} from 'react-native';

import * as firebase from 'firebase'
import { block } from 'react-native-reanimated';


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
	title : {
		marginVertical: 20
	},
	inputContainer : {
		margin: 5,
	},
	label : {
		fontSize: 16,
		color: '#444444',
		textShadow: '1px 1px #555555',
	},
	input : {
		fontFamily: 'Roboto',
		width: 350,
		height: '1.6rem',
		fontSize: '1.5rem',
		marginTop: 8,
		marginVertical: 15,
		padding: 3,
		color: '#000000',
		borderColor: '#9b9b9b',
		borderBottomWidth: 1,	
		borderBottomWidth: 2,	
	},
	button: { 
		display: 'block',
		width: 300,
		backgroundColor: '#147DF0',
		paddingLeft: 22,
	}
});

export default function Login({navigation}) {
	 const [ email, setEmail] = useState( '' );
	 const [password, setPassword] = useState( '' );
	 const [name, setName] =  useState( '' );
	const [error, setError] =  useState( '' );


	const onLogin = () => {
		
		console.log("test")

		 firebase.auth().signInWithEmailAndPassword(email, password)
		 	.then((result) => {setError("sucess")})
			 .catch((error) => {setError(""+error) })

			 console.log(email)
			 console.log(password)
	  }	  

    return (
        <SafeAreaView style={styles.container}>
			<Text>{error}</Text>
			<Image style={styles.image} source={require('../images/Logo.png')} />
			<Text style = {styles.title} > Register </Text>
			<View style = {styles.inputContainer}>
				<Text style = {styles.label} > Email Address </Text>
				<TextInput style={styles.input} placeholder ="email" onChangeText={(email) => setEmail(email)} />
			</View>
			<View style = {styles.inputContainer}>
				<Text style = {styles.label} > Email Address </Text>
				<TextInput style={styles.input} placeholder ="password" onChangeText={(password) => setPassword(password)} />
			</View>
			<Button style={styles.button} onPress={() => onLogin()} title="Login" />
        </SafeAreaView>
    )
}


