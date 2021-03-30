import React from 'react'
import { StyleSheet, SafeAreaView, View, FlatList, TouchableOpacity, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default function Market() {
    return (
        <SafeAreaView style={styles.container}>
            <Text>Market Screen</Text>
						<ScrollView>
							<Text>DCN</Text>
						</ScrollView>
						<View>
							<Text>Stock Details</Text>
						</View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stockList: {
    flex: 4,
  },

  stockItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: scaleSize(10),
    borderBottomWidth: scaleSize(1),
    borderBottomColor: "#2F2F2F",
  },

  stockItemRightContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  symbol: {
    color: "#fff",
    fontSize: scaleSize(20),
  },

  closingPrice: {
    color: "#fff",
    fontSize: scaleSize(20),
    marginRight: scaleSize(20),
  },

  percentageGainOrLossContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",

    width: scaleSize(100),
    height: scaleSize(35),
    borderRadius: scaleSize(10),
  },

  percentageGainOrLoss: {
    color: "#fff",
    fontSize: scaleSize(20),
    paddingRight: scaleSize(5),
  },


  // start of stock detail css
  stockDetail: {
    flex: 1, //get 1/5 space
    backgroundColor: "#202122" //grey
  },

  stockHeader: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: scaleSize(0.5),
    borderBottomColor: "#BCBCBC",
  },

  stockName: {
    color: "#fff",
    fontSize: scaleSize(20),
  },

  stockDetailRow: {
    flex: 1,
    flexDirection: "row",
    borderBottomWidth: scaleSize(1),
    borderBottomColor: "#404142",
  },

  stockProperty: {
    flex: 1, // get 1/(1+1) => 1/2 space
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: scaleSize(3),
  },

  stockPropertyName: {
    color: "#616263" //grey
  },

  stockPropertyValue: {
    color: "#fff",
    fontSize: scaleSize(15)
  },

});