import { useContext } from "react"
import { Text, View } from "react-native";
import { OrderContext } from "../../App"
import { FinalizedMenuItem, ProductSizeNames } from "../utils";

const CartScreen = () => {
	const { order } = useContext(OrderContext)

	return (
		<>
			{order.items.map((item: FinalizedMenuItem, i: number) => {
				return (
					<View style={{backgroundColor: "blue"}} key={i}>
						<Text>{item.name}</Text>
						{(item.size !== undefined) ? <Text>{ProductSizeNames[item.size]}</Text> : null}
						<Text>{item.quantity}</Text>
					</View>
				)
			})}
		</>
	)
}

export default CartScreen