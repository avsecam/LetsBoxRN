import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from "react-native"
import { NavigatorParams } from "../../App"
import FooterWithButton from "../components/footerWithButton"
import Header from "../components/header"
import QuantityPicker from "./quantityPicker"
import SizePicker from "./sizePicker"

type Props = NativeStackScreenProps<NavigatorParams, "Product">

const ProductScreen = ({route, navigation}: Props) => {
	console.log(route)
	return (
		<>
			<Header />
			<ScrollView style={styles.container} contentContainerStyle={{ alignItems: "center" }}>
				<Image style={styles.imageContainer} source={require("../../assets/food.png")} />
				<View style={styles.productInfo}>
					<Text style={styles.productName}>{route.params.name}</Text>
					<Text style={styles.productDescription}>{route.params.description}</Text>
				</View>
				<View style={styles.sizesContainer}>
					<Text style={styles.sizeLabel}>Size</Text>
					<SizePicker />
				</View>
				<KeyboardAvoidingView behavior="padding">
					<QuantityPicker />
				</KeyboardAvoidingView>
			</ScrollView>
			<FooterWithButton buttonText="ADD TO CART" />
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		padding: 30,
	},

	imageContainer: {
		marginBottom: 20,
		backgroundColor: "white",
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
		paddingHorizontal: "10%",
		marginBottom: 20,
	},
	sizeLabel: {
		fontSize: 25,
	},
})

export default ProductScreen