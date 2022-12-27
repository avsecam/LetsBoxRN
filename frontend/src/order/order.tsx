import { useContext } from "react"
import { StyleSheet, Text, View } from "react-native";
import Header from "../components/header";
import { FinalizedMenuItem, ProductSizeNames } from "../utils";
import { useOrder } from "./orderUtils";

const CartScreen = () => {
	const { order } = useOrder()

	return (
		<>
			<Header />
			{order.items.map((item: FinalizedMenuItem, i: number) =>
				<View style={{ backgroundColor: "blue" }} key={i}>
					<Text>{item.name}</Text>
					{(item.size !== undefined) ? <Text>{ProductSizeNames[item.size]}</Text> : null}
					<Text>{item.quantity}</Text>
				</View>
			)}
		</>
	)
}

const styles = StyleSheet.create({

})

export default CartScreen