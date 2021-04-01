import React, { useState, useLayoutEffect } from 'react';
import { StyleSheet, SafeAreaView, Text, Image, TextInput, Button, View } from 'react-native';
import { firebase } from '../firebase/config';
import {resetPassword} from './ResetPassword'


export default function Register({navigation}) {
	 const [email, setEmail] = useState("");
	 const [password, setPassword] = useState("");
	 const [confirmPassword, setConfirmPassword] = useState("")
	 const [error, setError] =  useState("");

	 useLayoutEffect(() => {
		 navigation.setOptions({
			 headerBackTitle: "Back to Login",
		 })
	 }, [navigation])

	const onSignUp = () => {
		if (!email) {
			setError("Please enter an email.")
			return;
		}
		if (password !== confirmPassword) {
			setError("Password and confirm password does not match. Try it again.")
			return;
		}
		 firebase
		 	.auth()
			.createUserWithEmailAndPassword(email, password)
		 	.then((response) => {
				 console.log("SignUp RESULT: ", response);
				 const uid = response.user.uid
				 const data = {
					 id: uid,
					 email,
				 };
				 const usersRef = firebase.firestore().collection('users');
				 usersRef
				 	.doc(uid)
					.set(data)
					.then(() => {
						navigation.navigate("Login")
					})					
				})
			 .catch((error) => setError(error.message))
	  }

    return (
      <SafeAreaView style={styles.container}>
				<Image style={styles.image} source={require('../../assets/images/logo.png')} />
				<View>
					<Text>{error}</Text>
					<View>
						<Text style={styles.label}>Email Address</Text>
						<TextInput style={styles.input} placeholder ="Enter email" onChangeText={(email) => setEmail(email)} />
					</View>
					<View>
						<Text style={styles.label}>Password</Text>
						<TextInput style={styles.input} secureTextEntry={true} placeholder="Enter password" onChangeText={(password) => setPassword(password)} />
					</View>	
					<View>
						<Text style={styles.label}>Confirm Password </Text>
						<TextInput style={styles.input} secureTextEntry={true} placeholder="Confirm password" onChangeText={(password) => setConfirmPassword(password)} />
					</View>				
					<Text style={styles.forgot} onPress={() => {resetPassword(email)}}>Forgot password or email?</Text>	
					<Button style={styles.button} onPress={() => onSignUp()} title="Sign Up" />
				</View>								
			</SafeAreaView>
    )
}

const styles = StyleSheet.create({
	container: {
    flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: 100,
		// fontFamily: 'Roboto',
	},
	image : {
		width: 300, 
		height: 300, 
	},
	label : {
		fontSize: 16,
		color: '#999999',
		// textShadow: '1px 0px #888888',
	},
	input : {
		// fontFamily: 'Roboto',
		height: 40,
		fontSize: 16,
		// marginTop: 8,
		marginVertical: 10,
		paddingLeft: 3,
		paddingRight: 3,
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
		width: 300,
		backgroundColor: '#147DF0',
	}
});
