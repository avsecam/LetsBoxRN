import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import Header from "../components/header"
import { MenuItem } from "../menu/menuUtils"
import { productSizes } from "../utils"
import QuantityPicker from "./quantityPicker"
import SizePicker from "./sizePicker"

interface Props {
	product: MenuItem,
}

const ProductScreen = () => {
	let props: MenuItem = {
		imageUrl: "",
		name: "Name Name",
		description: "Description Description"
	}


	return (
		<>
			<Header />
			<ScrollView style={styles.container} contentContainerStyle={{alignItems: "center"}}>
				<Image style={styles.imageContainer} source={require("../../assets/food.png")}/>
				<View style={styles.productInfo}>
					<Text style={styles.productName}>{props.name}</Text>
					<Text style={styles.productDescription}>{props.description}</Text>
				</View>
				<View style={styles.sizesContainer}>
					<Text style={styles.sizeLabel}>Size</Text>
					<SizePicker />
				</View>
				<QuantityPicker />
			</ScrollView>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		padding: 30,
	},

	imageContainer: {
		marginBottom: 20,
	},

	productInfo: {
		marginBottom: 20,
	},
	productName: {
		textAlign: "center",
		fontSize: 40,
	},
	productDescription: {
		textAlign: "center"
	},

	sizesContainer: {
		borderStyle: "solid",
		borderWidth: 1,
		borderRadius: 10,
		borderColor: "white",
		width: "100%",
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingVertical: 15,
		paddingHorizontal: "15%",
		marginBottom: 20,
	},
	sizeLabel: {
		fontSize: 30,
	},
})

export default ProductScreen