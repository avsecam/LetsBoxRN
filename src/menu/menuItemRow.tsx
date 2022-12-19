import { useNavigation } from "@react-navigation/native"
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from "react-native"
import { MenuItem } from "../utils"

interface Props {
	imageUrl?: string,
	name: string,
	description: string,
}

const MenuItemRow = (props: Props) => {
	const navigation = useNavigation()

	return (
		<>
			<TouchableOpacity onPress={() => navigation.navigate("Product" as never, props as never)}>
				<View style={styles.row}>
					<Image style={styles.imageContainer} source={(props.imageUrl) ? { uri: props.imageUrl } : require("../../assets/food.png")} />
					<View style={styles.infoContainer}>
						<Text style={styles.itemName}>
							{props.name}
						</Text>
						<Text style={styles.itemDescription}>
							{props.description}
						</Text>
					</View>
					<Text style={styles.qtyContainer}>9 in cart</Text>
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