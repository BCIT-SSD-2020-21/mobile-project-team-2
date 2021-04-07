import { Dimensions, StyleSheet } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

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
        flex: 1,
        flexDirection: 'column',        
        alignItems: 'center',
		justifyContent: 'center',
        paddingBottom: 5,       
    },
    headerContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: '100%',
        height: 200,
    },
	companyName: {
		color: '#fff',
		fontSize: 30,
		fontWeight: 'bold'
    },   
	question: {
		minWidth: 40,
		color: '#fff',
		fontSize: 24,
		margin: 15,
        textAlign: 'center'
    },   
    inputNumber: {
        height:50,
        maxHeight: 50,
        color: '#ffffff',
        fontSize: 40,
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
        height: '50%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#11111166',
        
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '31%',
        minHeight: '20%',
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
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: 'auto',
        marginVertical: 10,
        width: '70%',
        minHeight: 40,
        flexDirection: 'row',
        fontSize: 32,

	},
    buttonContinueText: {
        fontSize: 24,
        textAlign: 'center',
        color: 'white',
    },
})

export default styles