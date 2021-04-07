import React, { useState } from 'react';
import { SafeAreaView,ScrollView, Text, Image, TextInput, Button, View } from 'react-native';
import {firebase} from '../firebase/config';
import {resetPassword} from './ResetPassword'
import styles from '../styles/authStyles'

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
	const [error, setError] =  useState('');


	const onLogin = () => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((result) => {setError("sucess")})
            .catch((error) => {setError(""+error) })
    }	  

    return (
        <ScrollView>
            <SafeAreaView style={styles.container}>
                <Image style={styles.image} source={require('../../assets/images/logo.png')} />
                <View style={{marginBottom: 30}}>
                    <View>
                        <Text style={styles.label}>Email Address</Text>
                        <TextInput style={styles.input} autoCorrect={false} autoCapitalize={'none'} onChangeText={(email) => setEmail(email)} />
                    </View>
                    <View>
                        <Text style={styles.label}>Password</Text>
                        <TextInput style={styles.input} secureTextEntry={true} onChangeText={(password) => setPassword(password)} />
                    </View>	
                    <Text style={styles.forgot} onPress={() => resetPassword(email)}>Forgot password or email?</Text>
                    <Text style={{paddingBottom: 5, color: 'red'}}>{error}</Text>
                    <Button style={styles.button} onPress={() => onLogin()} title="Login" />
                </View>
            </SafeAreaView>
        </ScrollView>
        
    )
}