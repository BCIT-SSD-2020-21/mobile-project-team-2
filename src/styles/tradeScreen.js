import { Dimensions, StyleSheet } from 'react-native';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({

	container: {
		flex: 1,
        paddingTop: 30,
        alignItems: 'center',
		justifyContent: 'center',
        backgroundColor:  'white'
    },
    blueContainer:{
        backgroundColor: '#147DF0',
        flex: 1,
        alignItems: 'center',
		justifyContent: 'center',
        paddingBottom: 10,
    },
    results: {
        backgroundColor:  '#147DF0',
        maxWidth: width,
        height: 200,
	    minHeight: '25%',
        alignItems: 'center',
        justifyContent: 'center',
    },
	historyText: {
		color: '#fff',
		margin: 15,
		fontSize: 35,
	},
    resultText: {
        height:50,
        maxHeight: 50,
        color: '#fff',
        fontSize: 45,
    },
	companyName: {
		color: '#fff',
		fontSize: 34,
		fontWeight: 'bold'
    },
	howMany: {
		minWidth: 40,
		color: '#fff',
		margin: 15,
		fontSize: 24,
		alignItems: 'center',
		justifyContent: 'center',
        textAlign: 'center'
    },
    buttons: {
        width: width,
        height: '50%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        borderColor: '#fff',
	    backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '31%',
        minHeight: '20%',
    },
    textButton: {
        color: '#000',
        fontSize: 32,
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
        backgroundColor: '#147DF0', 
        color: 'white',
	},
    buttonContinueText: {
        fontSize: 24,
        textAlign: 'center',
        color: 'white',
    },
	renderValues: {
		maxHeight: 45,
		color: 'white',
		fontSize: 20,
		justifyContent: 'center',
		flexDirection: 'row',
	},
	wallet: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 'auto',
        width: width,
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10
	}
})

export default styles