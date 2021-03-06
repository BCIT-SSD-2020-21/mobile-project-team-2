import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Keyboard, SafeAreaView, Text, Image, TextInput, TouchableOpacity, View, StatusBar } from 'react-native';
import { firebase } from '../firebase/config';
import {resetPassword} from './ResetPassword';
import styles from '../styles/authStyles';
import { LinearGradient } from 'expo-linear-gradient';

export default function Register({navigation}) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("")
	const [error, setError] =  useState("");
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
          'keyboardDidShow',
          () => {
            setKeyboardVisible(true); // or some other action
          }
        );
        const keyboardDidHideListener = Keyboard.addListener(
          'keyboardDidHide',
          () => {
            setKeyboardVisible(false); // or some other action
          }
        );
    
        return () => {
          keyboardDidHideListener.remove();
          keyboardDidShowListener.remove();
        };
      }, []);

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
					email,
					cashOnHand: 0,
					positions: [],
					transactions: [],
					watchlist: [],
				};
				const usersRef = firebase.firestore().collection('users');
				usersRef
				.doc(uid)
				.set(data)			
			})
			.catch((error) => setError(error.message))
	  }

    return (
      	<SafeAreaView style={styles.container}>
          <StatusBar backgroundColor="#082b56" barStyle="light-content"/>
            <LinearGradient 
            colors={['#082b56', '#0b3d7a', 'transparent']} 
            style={styles.background}
            >  
			{ !isKeyboardVisible && <Image style={styles.image} source={require('../../assets/images/logo.png')} />}
			<View>
				{/* <Text>{error}</Text> style={{marginBottom: 30}} */}
				<View style={{marginTop: 30}}>
					<Text style={styles.label}>Email Address</Text>
					<TextInput style={styles.input} autoCorrect={false} autoCapitalize={'none'} onChangeText={(email) => setEmail(email.trim())} />
				</View>
				<View>
					<Text style={styles.label}>Password</Text>
					<TextInput style={styles.input} secureTextEntry={true} onChangeText={pw => setPassword(pw)} />
				</View>	
				<View>
					<Text style={styles.label}>Confirm Password</Text>
					<TextInput style={styles.input} secureTextEntry={true} onChangeText={pw => setConfirmPassword(pw)} />
				</View>				
				<Text style={styles.forgot} onPress={() => resetPassword(email)}>Forgot password or email?</Text>	
                <Text style={{paddingBottom: 5, color: 'red'}}>{error}</Text>
                <TouchableOpacity style={styles.button} onPress={() => onSignUp()} title="Sign Up" >
                    <Text style={styles.buttonText}>REGISTER</Text>
                </TouchableOpacity>
                {/* <Button style={styles.button} onPress={() => onSignUp()} title="Sign Up" /> */}
			    </View>	
            </LinearGradient>							
		</SafeAreaView>
    )
}

