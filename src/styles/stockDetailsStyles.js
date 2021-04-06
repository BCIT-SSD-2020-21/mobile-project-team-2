import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	safeAreaContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
    },
	container: {	
		width: '100%',
		flexDirection: 'column',	
		justifyContent: 'center',
		alignItems: 'center',
	},		
	titleContainer: {	
		width: '100%',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor:  '#147DF0',
		position: 'relative',	
	},	
	watch : {
		position: 'absolute',
		top: 0,
		right: 0,
		width: 50,
		height: 50,
	},
	companyDefaultLogo : {
		width: 60,
		height: 60,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',		
		borderRadius: 50,
		marginTop: 20,
		marginBottom: 10,
		backgroundColor:  '#606060',
	},
	companyLogoName: {
		color: '#fff',
		fontSize: 20,

		fontWeight: 'bold'
    },	
	companyName: {
		color: '#fff',
		fontSize: 22,
		fontWeight: 'bold'
    },	
    portfolio : {
		color: '#fff',
		fontSize: 26,
		fontWeight: 'bold'
    },	
	bodyContainer: {
		width: '80%',	
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
	},
	activities : {
		fontSize: 26,
		marginVertical: 10,
	},
    itemInfoSection: {
		width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
		alignItems: 'center',
		borderBottomWidth: 1,
		borderBottomColor: '#555555',
    },
    itemSymbol: {
        fontSize: 28,
        fontWeight: "bold",
        textTransform: "uppercase"
    },
    itemDescription: {
        fontSize: 24,
        color: "#000",
    },  
	company: {
		display: 'flex',
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		marginVertical: 5,
	},	
	companyInfo : {
		fontSize: 30,
		marginVertical: 10,
	},
	companyLogo: {
		resizeMode: 'stretch',
		width: 36,
		height: 36,
	},	
	buttons : {
		flex: 1,
		display: 'flex',
		width: "100%",
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginVertical: 10,
	},	
    buttonLeft: {
		backgroundColor:  '#147DF0',
		alignItems: 'center',
		justifyContent: 'center',
		width: '50%',
		padding: 4,
		marginLeft: 0,
		marginHorizontal: 10,
    },	
    buttonRight: {
		backgroundColor:  '#147DF0',
		alignItems: 'center',
		justifyContent: 'center',
		width: '50%',
		padding: 4,
		marginRight: 0,
		marginHorizontal: 10,		
    },	
    buttonText: {

		color: 'white',
		fontSize: 20, 
		height: 30, 
    },		
    card : {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center'
    },
    cardHeader : {
        fontSize: 16,
        fontWeight: 'bold'

    },
    cardDetail : {
        fontSize: 16,
        marginLeft: 10

    },

});

export default styles