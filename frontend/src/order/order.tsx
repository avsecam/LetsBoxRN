import { useContext } from "react"
import { Alert, StyleSheet, Text, View } from "react-native";
import FooterWithButton from "../components/footerWithButton";
import Header from "../components/header";
import { FinalizedMenuItem, getTotal, ProductSizeNames } from "../utils";
import { useOrder } from "./orderUtils";

const CartScreen = () => {
	const { order } = useOrder()

	return (
		<>
			<Header />
			{order.items.map((item: FinalizedMenuItem, i: number) =>
				<View style={styles.row} key={i}>
					<View style={styles.info}>
						<Text>{item.name}</Text>
						{(item.size !== undefined) ? <Text>{ProductSizeNames[item.size]}</Text> : null}
						<Text>{item.quantity} orders</Text>
					</View>
					<View style={styles.itemPriceContainer}>
						<Text style={styles.itemPrice}>P{getTotal(item, item.quantity, item.size).toFixed(2)}</Text>
					</View>
				</View>
			)}
			<FooterWithButton buttonText="CONFIRM ORDER" onPress={() => {Alert.alert("Order Confirmation", "Your order is on its way!")}} />
		</>
	)
}

const styles = StyleSheet.create({
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
		backgroundColor: "red",
		marginTop: 10,
		paddingVertical: 10,
		paddingHorizontal: 20,
	},
	info: {

	},
	itemPriceContainer: {
		alignSelf: "center"
	},
	itemPrice: {
		fontSize: 20,
	}
})

export default CartScreen