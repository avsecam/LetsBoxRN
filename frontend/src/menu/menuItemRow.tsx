import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { useContext } from "react"
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from "react-native"
import { NavigatorParams, OrderContext } from "../../App"
import { FinalizedMenuItem, MenuItem } from "../utils"

type Props = {
	item: MenuItem,
}

const MenuItemRow = (props: Props) => {
	const { order } = useContext(OrderContext)

	const navigation = useNavigation<NativeStackNavigationProp<NavigatorParams>>()

	const existingItemsInOrder: FinalizedMenuItem[] = order.items.filter(queryItem => queryItem.name === props.item.name)
	const quantityOfExistingItems = () => {
		let quantity: number = 0
		for (var i = 0; i < existingItemsInOrder.length; i++) {
			quantity += existingItemsInOrder[i].quantity
		}
		return quantity
	}

	return (
		<>
			<TouchableOpacity onPress={() => navigation.navigate("Product", props)}>
				<View style={styles.row}>
					<Image style={styles.imageContainer} source={(props.item.imageUrl) ? { uri: props.item.imageUrl } : require("../../assets/food.png")} />
					<View style={styles.infoContainer}>
						<Text style={styles.itemName}>
							{props.item.name}
						</Text>
						<Text style={styles.itemDescription}>
							{props.item.description}
						</Text>
					</View>
					<Text style={styles.qtyContainer}>{(existingItemsInOrder.length !== 0) ? `${quantityOfExistingItems()} in cart` : null}</Text>
				</View>
			</TouchableOpacity>
		</>
	)
}

const styles = StyleSheet.create({
	row: {
		paddingVertical: 5,
		paddingHorizontal: 20,
		marginVertical: 5,
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "red",
	},
	imageContainer: {
		flex: 1,
		height: 100,
	},
	infoContainer: {
		marginLeft: 20,
		flex: 2,
	},
	itemName: {
		fontSize: 20,
	},
	itemDescription: {
	},

	qtyContainer: {
		flex: 1,
		textAlign: "right",
	}
})

export default MenuItemRow