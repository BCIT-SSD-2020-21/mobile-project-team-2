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

} from 'react-native';
import { firebase } from '../../firebase/config';

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

export default function Register({navigation}) {
	 const [email, setEmail] = useState("");
	 const [password, setPassword] = useState("");
	 const [error, setError] =  useState("");

	 useLayoutEffect(() => {
		 navigation.setOptions({
			 headerBackTitle: "Back to Login",
		 })
	 }, [navigation])

	const onSignUp = () => {
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
			 .catch((error) => setError(error.message) )
	  }

	console.log("Error state is: ", error)
    return (
        <SafeAreaView style={styles.container}>
			<Text>{error}</Text>
			<TextInput style={styles.input} placeholder ="email" onChangeText={(email) => setEmail(email)} />
			<TextInput style={styles.input} secureTextEntry={true} placeholder ="password" onChangeText={(password) => setPassword(password)} />

			<Button style={styles.button} onPress={() => onSignUp()} title="Sign Up" />
        </SafeAreaView>
    )
}
