import { Dimensions, StyleSheet } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height - 30;

const styles = StyleSheet.create({

    background: {
        backgroundColor: '#082b56', // dark-blue
	},    
	container: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
        width: width,
        height: height, 
    },
    BuySellContainer:{
        flexDirection: 'column',        
        alignItems: 'center',
		justifyContent: 'flex-start',
        padding: 0,
        margin: 0,
        marginBottom: 5,  
        height: '40%', 
    },
	companyName: {
		color: '#fff',
		fontSize: 24,
		fontWeight: 'bold', 
    },   
	question: {
		minWidth: 40,
		color: '#fff',
		fontSize: 20,
		margin: 5,
        textAlign: 'center'
    },   
    inputNumber: {
        color: '#ffffff',
        fontSize: 30,
    },      
	wallet: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: width,
        paddingHorizontal: 15,
 
	},    
	renderValueLeft: {
        width: '45%',
		color: 'white',
		fontSize: 20,
	}, 
	renderValueRight: {
        width: '45%',
		color: 'white',
		fontSize: 20,
        textAlign: 'right',
	},         
    buttons: {
        width: width,
        height: '40%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
        
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '32%',
        minHeight: '9%',
        borderRadius: 9,
        color: '#22222266',
        borderColor: '#cbdae466',
        borderWidth: 1,        
    },
    textButton: {
        color: '#000',
        fontSize: 32,
        color: '#FFFFFF',

    },
	buttonContinue: {
		width: '45%',
		height: 40,
		marginTop: 30,	
		padding: 10,
		borderRadius: 7,
		alignItems: 'center',
		backgroundColor: "#5584a466", // blue
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
	},
    buttonContinueText: {
        fontSize: 24,
		textAlign: 'center',
		textAlignVertical: 'center',
        color: 'white',
    },
})

export default styles