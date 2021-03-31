import React, { useState } from 'react'
import {
	StyleSheet,
	SafeAreaView,
	Button,
	FlatList,
	TouchableOpacity,
	Text,
	Image,
	View
} from 'react-native';
import { firebase } from '../firebase/config';
import { EvilIcons } from '@expo/vector-icons';

const styles = StyleSheet.create({
	container: {
        flex: 1,
		display: 'flex',
		alignItems: "center",
		justifyContent: "center",
		// padding: 100,
		fontFamily: 'Roboto',
		backgroundColor: '#0f1d12', //dark-green
    },
	icon: {
		margin: 'auto',
		fontSize: 328,
		color: "#59a66b",
	},	
	image: {
		width:400, 
		height:400, 
	},
	button: { 
		display: 'block',
		width: '32%',
		margin: '0',
		// backgroundColor: '#147DF0',
		backgroundColor: '#59a66b', // medium-green
	}
});

export default function Portfolio({navigation}) {
	const [error, setError] = useState('')
	const onSignout = () => {
		firebase.auth().signOut()
			.then(() => setError("User SignedOut"))
			.catch((error) => setError(error.message))
	 }
    return (
        <SafeAreaView style={styles.container}>
		<View>
			<Button 
				style={styles.button} 
				onPress={onSignout}
				color="#59a66b" 
				title="Sign Out" />
			<Text style={styles.greeting}>{}</Text>
			<EvilIcons style={styles.icon} name="chart" size={30} color="black" />
			{/* an image placeholder for TODO task */}
			<Image style={styles.image} />
			<View>
				<Text>{error}</Text>
				
			</View>		
		</View>
        </SafeAreaView>
    )
}
