import { Dimensions, Image, StyleSheet, Text, useWindowDimensions, View } from "react-native"

interface Props {
	imageUrl?: string,
	name: string,
	description: string,
}

const MenuItemRow = (menuItem: Props) => {
	return (
		<>
			<View style={styles.row}>
				<Image style={styles.imageContainer} source={(menuItem.imageUrl) ? {uri: menuItem.imageUrl} : require("../../assets/food.png")} />
				<View style={styles.infoContainer}>
					<Text style={styles.itemName}>
						{menuItem.name}
					</Text>
					<Text style={styles.itemDescription}>
						{menuItem.description}
					</Text>
				</View>
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	row: {
		paddingVertical: 5,
		paddingHorizontal: 10,
		marginVertical: 5,
		display: "flex",
		flexDirection: "row",
		backgroundColor: "red",
		alignItems: "center",
	},
	imageContainer: {
		width: 100,
		height: 100,
		marginRight: 10,
	},
	infoContainer: {
	},
	itemName: {
		fontSize: 20,
	},
	itemDescription: {
		width: "80%",
	},
})

export default MenuItemRow