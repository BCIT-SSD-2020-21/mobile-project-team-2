import React, { useState, useEffect } from 'react';
import {StyleSheet, SafeAreaView, Text, Image, TextInput, Button, View } from 'react-native';
import {firebase} from '../firebase/config';
import {resetPassword} from './ResetPassword'


export default function Login({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
	const [error, setError] =  useState('');


	const onLogin = () => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((result) => {setError("sucess")})
            .catch((error) => {setError(""+error) })
    }	  

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.image} source={require('../../assets/images/logo.png')} />
            <View>
                <View>
                    <Text style={styles.label}>Email Address </Text>
                    <TextInput style={styles.input} autoCorrect={false} autoCapitalize={'none'} placeholder="Enter email" onChangeText={(email) => setEmail(email)} />
                </View>
                <View>
                    <Text style={styles.label}>Password</Text>
                    <TextInput style={styles.input} secureTextEntry={true} placeholder="Enter password" onChangeText={(password) => setPassword(password)} />
                </View>	
                <Text style={styles.forgot} onPress={() => resetPassword(email)}>Forgot password or email?</Text>
                <Text style={{paddingBottom: 5, color: 'red'}}>{error}</Text>
                <Button style={styles.button} onPress={() => onLogin()} title="Login" />
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
		// display: 'block',
		width: 300,
		backgroundColor: '#147DF0',
	}
});