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

import * as firebase from 'firebase'

  var firebaseConfig = {
    apiKey: "AIzaSyDFxRRPqBUNisZNWGbNszkMikswNTsjvbw",
    authDomain: "realstock-4e514.firebaseapp.com",
    projectId: "realstock-4e514",
    storageBucket: "realstock-4e514.appspot.com",
    messagingSenderId: "710212979677",
    appId: "1:710212979677:web:f23259bc5f2bb0d317c434"
  };
 

  if(firebase.apps.length === 0) {
	  firebase.initializeApp(firebaseConfig)
  }


const styles = StyleSheet.create({
	container: {
        flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: 100,
		backgroundColor: "Red"
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
	 const [ email, setEmail] = useState( '' );
	 const [password, setPassword] = useState( '' );
	 const [name, setName] =  useState( '' );
	 const [error, setError] =  useState( '' );

	 useLayoutEffect(() => {
		 navigation.setOptions({
			 headerBackTitle: "Back to Login",
		 })
	 }, [navigation])

	const onSignUp = () => {
		 firebase.auth().createUserWithEmailAndPassword(email, password)
		 	.then( (result) => {console.log(result)})
			 .catch((error) => {setError(""+error) })
	  }

	const onSignIn = () => {
		 firebase.auth().signInWithEmailAndPassword(email, password)
		 	.then((result) => {console.log(result)})
			 .catch((error) => {console.log(error)})
	  }	  

    return (
        <SafeAreaView style={styles.container}>
			<Text>{error}</Text>
			<TextInput style={styles.input} placeholder ="name" onChangeText={(name) => setName(name)} />
			<TextInput style={styles.input} placeholder ="email" onChangeText={(email) => setEmail(email)} />
			<TextInput style={styles.input} placeholder ="password" onChangeText={(password) => setPassword(password)} />

			<Button style={styles.button} onPress={() => onSignUp()} title="Sign Up" />
        </SafeAreaView>
    )
}
