
import { Dimensions, StyleSheet } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
	container: {
        flex: 1,
		alignItems: "center",
		justifyContent: "space-between",
		height: height,
	},
	image : {
        marginTop: 50,
		width: 280, 
		height: 280, 
	},
	label : {
		fontSize: 16,
		color: '#999999',
	},
	input : {
		height: 35,
		fontSize: 16,
		marginVertical: 5,
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

export default styles