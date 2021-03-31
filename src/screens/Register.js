import React, { useState, useLayoutEffect } from 'react';
import {
	StyleSheet,
	SafeAreaView,
	ImageBackground,
	FlatList,
	TouchableOpacity,
	Text,
	Image,
	TextInput,
	Button,
	View,

} from 'react-native';

import * as firebase from 'firebase'

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
		borderBottomWidth: 2,	
	},
	forgot : {
		marginBottom: 15,
		width: 300,
		color: '#147DF0'		
	},
	button: { 
		display: 'block',
		width: 300,
		backgroundColor: '#147DF0',
	}
});
export default function Register({navigation}) {
	 const [email, setEmail] = useState("");
	 const [password, setPassword] = useState("");
	 const [confirmPassword, setConfirmPassword] = useState("")
	 const [name, setName] =  useState("");
	 const [error, setError] =  useState("");

	 useLayoutEffect(() => {
		 navigation.setOptions({
			 headerBackTitle: "Back to Login",
		 })
	 }, [navigation])

	const onSignUp = () => {
		if (!name)
		{
			setError("Please enter a name.")
			return;
		}
		 firebase.auth().createUserWithEmailAndPassword(email, password)
		 	.then((result) => {setError("sucess")})
			 .catch((error) => {setError(""+error) })
	  }

    return (
        <SafeAreaView style={styles.container}>
			<Image style={styles.image} source={require('../images/Logo.png')} />
			<View>
				<Text>{error}</Text>
				<View style = {styles.inputContainer}>
					<Text style = {styles.label} > Email Address </Text>
					<TextInput style={styles.input} placeholder ="email" onChangeText={(email) => setEmail(email)} />
				</View>
				<View style = {styles.inputContainer}>
					<Text style = {styles.label} > Password </Text>
					<TextInput style={styles.input} secureTextEntry={true} placeholder ="password" onChangeText={(password) => setPassword(password)} />
				</View>	
				<View style = {styles.inputContainer}>
					<Text style = {styles.label} > Confirm Password </Text>
					<TextInput style={styles.input} secureTextEntry={true} placeholder ="password" onChangeText={(password) => setConfirmPassword(password)} />
				</View>				
				<Text style = {styles.forgot} onPress={() => {alert("dd")}} > Forgot password or email?</Text>	
				<Button style={styles.button} onPress={() => onSignUp()} title="Sign Up" />
			</View>								
        </SafeAreaView>
    )
}
