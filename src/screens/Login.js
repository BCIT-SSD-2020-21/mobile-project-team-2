import React, { useState } from 'react';
import { Keyboard, SafeAreaView, Text, Image, TextInput, TouchableOpacity, View } from 'react-native';
import {firebase} from '../firebase/config';
import {resetPassword} from './ResetPassword'
import styles from '../styles/authStyles'
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect } from 'react/cjs/react.development';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
	const [error, setError] =  useState('');
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

	const onLogin = () => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((result) => {setError("success")})
            .catch((error) => setError(error.message))
    }	  

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

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient 
            colors={['#082b56', '#0b3d7a', 'transparent']} 
            style={styles.background}
            >    
            {!isKeyboardVisible && <Image style={styles.image} source={require('../../assets/images/logo.png')} />}
            <View >
                <View style={{marginTop: 30}}>
                    <Text style={styles.label}>Email Address</Text>
                    <TextInput style={styles.input} autoCorrect={false} autoCapitalize={'none'} onChangeText={(email) => setEmail(email)} />
                </View>
                <View>
                    <Text style={styles.label}>Password</Text>
                    <TextInput style={styles.input} secureTextEntry={true} onChangeText={(password) => setPassword(password)} />
                </View>	
                <Text style={styles.forgot} onPress={() => resetPassword(email)}>Forgot password or email?</Text>
                <Text style={{paddingBottom: 5, color: 'red'}}>{error}</Text>
                <TouchableOpacity style={styles.button} onPress={() => onLogin()} title="Login">
                    <Text style={styles.buttonText}>LOGIN</Text>
                </TouchableOpacity>
            </View>
            </LinearGradient>
        </SafeAreaView>
    )
}