
import { Dimensions, StyleSheet } from 'react-native';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
    
	container: {
        flex: 1,
        backgroundColor: '#082b56',
		alignItems: "center",
		justifyContent: "space-between",
		height: height,
	},

    background :{
        width: width,
        height: height,
        alignItems: "center",
    },

	image : {
        marginTop: 50,
		width: 300, 
		height: 280, 
        alignItems: "center",
		justifyContent: "space-around",
	},

	label : {
		fontSize: 16,
		color: '#999999',
        paddingLeft:10,
        paddingRight:10,
        paddingTop: 20,
	},
	input : {
		height: 35,
		fontSize: 16,
		marginVertical: 5,
		paddingLeft: 10,
		paddingRight: 10,
		color: '#fff',
        width: '96%',
		height: 40,
		margin: 5,	
		padding: 10,
		borderRadius: 7,
		alignItems: 'center',
		backgroundColor: "#5584a466", // blue
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
       	
	},
	forgot : {
		marginBottom: 15,
		width: 300,
		color: '#147DF0'		
	},
	button: {
		width: 300,
		backgroundColor: '#5584a466',
	}
});

export default styles