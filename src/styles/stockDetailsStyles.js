import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    // CONTAINER
	safeAreaContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
    },
    background: {
        backgroundColor: '#082b56', // dark-blue
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
		// backgroundColor:  '#147DF0',
		position: 'relative',	
	},	
	watch : {
		position: 'absolute',
		top: 0,
		right: 0,
		width: 50,
		height: 50,
        marginRight: 10
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
		// backgroundColor:  '#606060',
	},
    // Logo at top center
	companyLogo: {
		resizeMode: 'stretch',
		width: 66,
		height: 66,
        marginHorizontal: 20,
        borderRadius: 15
	},
	companyLogoName: {
		color: '#fff',
		fontSize: 20,
		// fontWeight: 'bold'
    },	
	companyName: {
		color: '#fff',
		fontSize: 22,
		fontWeight: 'bold'
    },	
    portfolio : {
		color: '#fff',
		fontSize: 22,
        marginTop: 5
		// fontWeight: 'bold'
    },	
	bodyContainer: {
		width: '80%',	
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	activities : {
		fontSize: 26,
		marginVertical: 10,
        color: '#818e99',
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
        fontSize: 18,
        textTransform: "uppercase",
        color: "#818e99"
    },
    itemDescription: {
        fontSize: 18,
        color: "#818e99",
    },  
	company: {
		display: 'flex',
		width: '100%',
		justifyContent: 'flex-start',
		alignItems: 'center',
		marginVertical: 5,
	},	
	companyInfo : {
		fontSize: 26,
		marginVertical: 10,
        color: "#818e99",
        display: 'flex',
        justifyContent: 'space-around' 
	},	
	buttons : {
		flex: 1,
		display: 'flex',
		width: "100%",
		flexDirection: 'row',
		justifyContent: 'center',
		marginVertical: 10,
	},	
    buttonLeft: {
		backgroundColor:  '#5584a466',
		alignItems: 'center',
		justifyContent: 'center',
		width: '50%',
		padding: 4,
		marginLeft: 0,
		marginHorizontal: 10,
    },	
    buttonRight: {
		backgroundColor:  '#5584a466',
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
        alignItems: 'center',
    },
    cardHeader : {
        fontSize: 16,
        fontWeight: 'bold',
        color: "#818e99"

    },
    cardDetail : {
        fontSize: 13,
        marginLeft: 10,
        color: "#818e99"

    },
    stockDetailVariance: {
        fontSize: 14,
        color: "white"
    }
});

export default styles