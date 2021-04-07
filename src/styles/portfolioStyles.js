
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	// CONTAINER
    scrollContainer: {
        backgroundColor: '#082b56', // dark-blue
	},
    container: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
        width: '100%',
    },
    // GREET
	greetContainer: {
		alignItems: 'center',
	},
	greetLabel: {
		fontSize: 16,
		color: 'white', 
		paddingTop: 20,
		paddingBottom: 5
	},
	portfolioValue: {
		fontSize: 32,
		color: "white",
		fontWeight: "bold",
	},
	portfolioVariance: {
		fontSize: 14,
		color: "white",
		// paddingTop: 5,
		// paddingBottom: 10
	},
	chartContainer: {
		// textAlign: "center"
	// 	backgroundColor: "linear-gradient(180deg, rgba(32, 140, 249, 0.96875) 0%, #1268D0 100%),linear-gradient(0deg, #0876EE, #0876EE)" // not working - need https://docs.expo.io/versions/latest/sdk/linear-gradient/
	},
    walletActions: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
        width: '80%',
    },
	fundingContainer: {
        width: '100%',
		display: 'flex',
		// flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	fundingLabel: {
		fontSize: 20,
		// color: '#abd4b4', // lightGreen
	},
	fundingAmount: {
		fontSize: 24,
		// color: '#abd4b4', // lightGreen
	},
	fundingButton: {
		width: '45%',
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
	fundingButtonText: {
		textAlign: 'center',
		textAlignVertical: 'center',
		fontSize: 14,
		color: '#cbdae4', // lightGreen
	},
	fundingForm: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	fundingFormField: {
		// fontFamily: 'Roboto',
		height: 40,
		fontSize: 24,
		// marginTop: 8,
		marginVertical: 10,
		paddingLeft: 3,
		paddingRight: 3,
		color: '#000000',
		borderColor: '#9b9b9b',
		borderBottomWidth: 2,	
	},
	listingContainer: {
		// borderRadius: 5,
		minWidth: 320,
		width: '100%',
		maxWidth: 400,
		paddingLeft: 1
	},
	listingHeader: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		// alignItems: 'center',
        marginLeft: 15,
        marginBottom: 0,
	},
	listingTitle: {
		fontSize: 26,
		color: '#cbdae466', //
	},
	listingButton: {
		width: 80,
		height: 30,
		borderRadius: 5,
		// backgroundColor: '#59a66b', // medium-green
		// backgroundColor: '#147DF0',
	},
	listingItem: {
		fontSize: 22,
		// color: '#abd4b4', // lightGreen
	},
	stockListItem: {
		paddingBottom: 10,
		borderBottomColor: "grey",
		borderBottomWidth: 1
	},
	stockList: {
		height: 100,
	}
});

export default styles