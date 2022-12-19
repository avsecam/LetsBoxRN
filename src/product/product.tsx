import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { useState } from "react"
import { Image, Keyboard, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { NavigatorParams } from "../../App"
import FooterWithButton from "../components/footerWithButton"
import Header from "../components/header"
import SizePicker from "./sizePicker"

type Props = NativeStackScreenProps<NavigatorParams, "Product">

const ProductScreen = ({ route, navigation }: Props) => {
	const [quantity, setQuantity] = useState(1)
	const handleSetQty = (newQuantity: number) => {
		if (newQuantity < 0 || newQuantity > 99) return
		setQuantity(newQuantity)
	}
	const handleSetQtyInput = (newQuantity: string) => {
		handleSetQty((isNaN(Number.parseInt(newQuantity))) ? 0 : Number.parseInt(newQuantity))
	}

	const [keyboardVisibility, setKeyboardVisibility] = useState(false)
	Keyboard.addListener("keyboardDidHide", () => setKeyboardVisibility(false))
	Keyboard.addListener("keyboardDidShow", () => setKeyboardVisibility(true))

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
					<View style={styles.qtyContainer}>
						<TouchableOpacity style={[styles.qtyBtn, styles.qtyBtnLeft]} onPress={() => handleSetQty(quantity - 1)}><Text style={styles.qtyBtnText}>-</Text></TouchableOpacity>
						<TextInput style={styles.qty} value={quantity.toString()} keyboardType="number-pad" onChangeText={(text: string) => handleSetQtyInput(text)} />
						<TouchableOpacity style={[styles.qtyBtn, styles.qtyBtnRight]} onPress={() => handleSetQty(quantity + 1)}><Text style={styles.qtyBtnText}>+</Text></TouchableOpacity>
					</View>
				</KeyboardAvoidingView>
			</ScrollView>
			{(keyboardVisibility) ? null : <FooterWithButton buttonText="ADD TO CART" onPress={() => {}} />}
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 30,
	},

	imageContainer: {
		height: 200,
		width: 200,
		marginVertical: 20,
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

	qtyContainer: {
		width: "80%",
		height: 50,
		display: "flex",
		flexDirection: "row",
	},
	qtyBtn: {
		flex: 1,
		backgroundColor: "purple",
		justifyContent: "center"
	},
	qtyBtnText: {
		fontSize: 40,
		textAlign: "center",
	},
	qtyBtnLeft: {
		borderTopLeftRadius: 10,
		borderBottomLeftRadius: 10,
	},
	qtyBtnRight: {
		borderTopRightRadius: 10,
		borderBottomRightRadius: 10,
	},

	qty: {
		flex: 3,
		backgroundColor: "gray",
		textAlign: "center",
		textAlignVertical: "center",
		fontSize: 30,
	},
})

export default ProductScreen