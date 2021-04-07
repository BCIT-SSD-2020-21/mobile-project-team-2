import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},

	promptText: {
		marginTop: 10,
		marginBottom: 10,
		textAlign: "center"
	},

	searchSection: {
		flexDirection: 'row',
		alignItems: 'center',
		borderBottomColor: 'grey',
		borderBottomWidth: 0.5,
		height: 40,
		borderRadius: 10,
		marginHorizontal: 3,
		marginTop: 5,
	},

	searchIcon: {
		paddingHorizontal: 15,
		fontSize: 20,
	},

	searchInput: {
		flex: 1, // get the rest of the space
	},

	stockListItem: {
		paddingBottom: 10,
		borderBottomColor: "grey",
		borderBottomWidth: 0.3
	},

	stockSymbol: {
		paddingHorizontal: 10,
		paddingTop: 10,
		color: "blue",
		fontSize: 20
	},

	stockName: {
		paddingHorizontal: 10,
		color: "black"
	},

	stockList: {
		height: 200,
	},
})

export default styles