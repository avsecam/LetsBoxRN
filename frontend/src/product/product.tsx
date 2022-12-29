import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { useState } from "react"
import { Alert, Image, Keyboard, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { NavigatorParams } from "../../App"
import FooterWithButton from "../components/footerWithButton"
import Header from "../components/header"
import { useOrder } from "../order/orderUtils"
import { drinkPrice, FinalizedMenuItem, getTotal, MenuItem, ProductSizeNames, productSizes, ProductType } from "../utils"
import SizeButton from "./sizeButton"

type Props = NativeStackScreenProps<NavigatorParams, "Product">

const ProductScreen = ({ route, navigation }: Props) => {
	const item: MenuItem = route.params.item

	const { order, addToOrder, removeFromOrder } = useOrder()
	
	const existingItemsInOrder: FinalizedMenuItem[] = order.items.filter(val => val.id === item._id)

	const [chosenSize, setChosenSize] = useState(-1)

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

	const handleSubmit = () => {
		if (item.type === ProductType.Food && chosenSize === -1) return

		const finalizedMenuItem: FinalizedMenuItem = {
			id: route.params.item._id,
			description: (route.params.item.description) ? route.params.item.description : "",
			name: route.params.item.name,
			quantity: quantity,
			type: item.type,
			size: (item.type === ProductType.Food) ? chosenSize : -1,
		}

		if (quantity > 0) {
			addToOrder(finalizedMenuItem)
		} else {
			removeFromOrder(finalizedMenuItem)
		}

		navigation.goBack()
	}

	let sizeButtons: JSX.Element[] = []
	for (let i: number = 0; i < productSizes.length; i++) {
		const existingItemInOrderWithSize: FinalizedMenuItem | undefined = existingItemsInOrder.find(val => val.size === productSizes[i][0])

		sizeButtons.push(
			<SizeButton
				price={productSizes[i][1]}
				sizeName={ProductSizeNames[productSizes[i][0]]}
				onPress={() => {
					setChosenSize(i)
				}}
				isChosen={(chosenSize === i)}
				qtyInOrder={(existingItemInOrderWithSize) ? existingItemInOrderWithSize.quantity : undefined}
				key={i} />
		)
	}

	return (
		<>
			<Header />
			<ScrollView style={styles.container} contentContainerStyle={{ alignItems: "center" }}>
				<Image style={styles.imageContainer} source={require("../../assets/food.png")} />
				<View style={styles.productInfo}>
					<Text style={styles.productName}>{route.params.item.name}</Text>
					<Text style={styles.productDescription}>{route.params.item.description}</Text>
				</View>
				{(item.type === ProductType.Food) ?
					<View style={styles.sizesContainer}>
						{sizeButtons}
					</View> :
					null}
				<KeyboardAvoidingView behavior="padding">
					<View style={styles.qtyContainer}>
						<TouchableOpacity style={[styles.qtyBtn, styles.qtyBtnLeft]} onPress={() => handleSetQty(quantity - 1)}><Text style={styles.qtyBtnText}>-</Text></TouchableOpacity>
						<TextInput style={styles.qty} value={quantity.toString()} keyboardType="number-pad" onChangeText={(text: string) => handleSetQtyInput(text)} />
						<TouchableOpacity style={[styles.qtyBtn, styles.qtyBtnRight]} onPress={() => handleSetQty(quantity + 1)}><Text style={styles.qtyBtnText}>+</Text></TouchableOpacity>
					</View>
				</KeyboardAvoidingView>
				<Text style={styles.totalLabel}>P{getTotal(item, quantity, chosenSize).toFixed(2)}</Text>
			</ScrollView>
			{(keyboardVisibility) ? null : <FooterWithButton buttonText={(quantity > 0) ? "ADD TO CART" : "REMOVE FROM CART"} onPress={() => handleSubmit()} />}
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

	// PRODUCT INFO
	productInfo: {
		marginBottom: 20,
	},
	productName: {
		textAlign: "center",
		fontSize: 30,
	},
	productDescription: {
		textAlign: "center"
	},

	// SIZES
	sizesContainer: {
		borderStyle: "solid",
		borderWidth: 1,
		borderRadius: 10,
		borderColor: "white",
		width: "100%",
		display: "flex",
		justifyContent: "space-between",
		padding: 15,
		alignItems: "stretch",
		marginBottom: 20,
	},
	sizeLabel: {
		fontSize: 25,
	},

	// QUANTITY
	qtyContainer: {
		width: "80%",
		display: "flex",
		flexDirection: "row",
		marginBottom: 10,
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

	totalLabel: {
		fontSize: 30,
	}
})

export default ProductScreen