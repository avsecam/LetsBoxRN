import { useState, useContext, useEffect } from "react"
import { Alert, View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, TextInput, ScrollView, Keyboard } from "react-native"
import FooterWithButton from "../../components/footerWithButton"
import Header from "../../components/header"
import { OrderContext } from "../../order/orderUtils"
import SizeButton from "../../product/sizeButton"
import { extrasPrice, FinalizedMenuItem, getMenuGroup, getTotal, MenuItem, ProductSizeNames, productSizes } from "../../utils"
import { IngredientTypes, ManualOrderContext, ManualOrderProvider } from "./utils"

export const ManualOrderScreen = () => {
	return (
		<>
			<ManualOrderProvider>
				<ManualOrderContainer />
			</ManualOrderProvider>
		</>
	)
}


type ManualOrderItems = {
	[IngredientTypes.Rice]?: MenuItem[],
	[IngredientTypes.Mains]?: MenuItem[],
	[IngredientTypes.Toppings]?: MenuItem[],
}

const ManualOrderContainer = () => {
	const { addToOrder } = useContext(OrderContext)
	const { getTotalPrice, getExtraPrice, choices, createFinalizedMenuItem } = useContext(ManualOrderContext)

	const [items, setItems] = useState<ManualOrderItems>({}) // Contains all manual order menu items
	const [chosenSize, setChosenSize] = useState<ProductSizeNames>(-1)

	const [keyboardVisibility, setKeyboardVisibility] = useState(false)
	Keyboard.addListener("keyboardDidHide", () => setKeyboardVisibility(false))
	Keyboard.addListener("keyboardDidShow", () => setKeyboardVisibility(true))

	useEffect(() => {
		(async () => {
			const rice = await getMenuGroup("manual-rice")
			const mains = await getMenuGroup("manual-main")
			const toppings = await getMenuGroup("manual-toppings")

			const newItems = { [IngredientTypes.Rice]: rice, [IngredientTypes.Mains]: mains, [IngredientTypes.Toppings]: toppings }

			setItems(newItems)
		})()
	}, [])

	const [qty, setQty] = useState<number>(1)
	const handleSetQty = (newQuantity: number) => {
		if (newQuantity < 0 || newQuantity > 99) return
		setQty(newQuantity)
	}
	const handleSetQtyInput = (newQuantity: string) => {
		handleSetQty((isNaN(Number.parseInt(newQuantity))) ? 0 : Number.parseInt(newQuantity))
	}

	const handleSubmit = async () => {
		if (choices[IngredientTypes.Rice] === undefined
			|| choices[IngredientTypes.Mains] === undefined
			|| choices[IngredientTypes.Toppings].length < 1) {
			Alert.alert("Please complete your order!")
			return
		}

		await createFinalizedMenuItem(qty, chosenSize)
			.then(v => addToOrder(v))
			.catch(err => console.error(err))
	}

	let sizeButtons: JSX.Element[] = []
	for (let i: number = 0; i < productSizes.length; i++) {
		sizeButtons.push(
			<SizeButton
				price={productSizes[i][1]}
				sizeName={ProductSizeNames[productSizes[i][0]]}
				onPress={() => {
					setChosenSize(i)
				}}
				isChosen={(chosenSize === i)}
				key={i} />
		)
	}

	return (
		<>
			<View>
				<Header />
				<ScrollView style={styles.container} contentContainerStyle={{ alignItems: "center" }}>
					<View>
						<MenuGroup groupName={IngredientTypes.Rice} data={items[IngredientTypes.Rice] ?? []} />
						<MenuGroup groupName={IngredientTypes.Mains} data={items[IngredientTypes.Mains] ?? []} />
						<MenuGroup groupName={IngredientTypes.Toppings} data={items[IngredientTypes.Toppings] ?? []} />
					</View>
					<View>
						<Text>Extra toppings P{extrasPrice}</Text>
						<Text>Extra price: P{`${getExtraPrice()}`}</Text>
					</View>
					<View style={styles.sizesContainer}>
						{sizeButtons}
					</View>
					<KeyboardAvoidingView behavior="height">
						<View style={styles.qtyContainer}>
							<TouchableOpacity style={[styles.qtyBtn, styles.qtyBtnLeft]} onPress={() => handleSetQty(qty - 1)}><Text style={styles.qtyBtnText}>-</Text></TouchableOpacity>
							<TextInput style={styles.qty} value={qty.toString()} keyboardType="number-pad" onChangeText={(text: string) => handleSetQtyInput(text)} />
							<TouchableOpacity style={[styles.qtyBtn, styles.qtyBtnRight]} onPress={() => handleSetQty(qty + 1)}><Text style={styles.qtyBtnText}>+</Text></TouchableOpacity>
						</View>
					</KeyboardAvoidingView>
					<Text style={styles.totalLabel}>P{(getTotalPrice(qty, chosenSize) + getExtraPrice()).toFixed(2)}</Text>
				{(keyboardVisibility) ? null : <FooterWithButton buttonText="ADD TO ORDER" onPress={handleSubmit} />}
				</ScrollView>

			</View>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		marginBottom: 60,
	},
	// SIZES
	sizesContainer: {
		borderStyle: "solid",
		borderWidth: 1,
		borderRadius: 10,
		borderColor: "white",
		width: "100%",
		justifyContent: "space-between",
		padding: 15,
		alignItems: "stretch",
		marginBottom: 20,
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

type GroupProps = {
	groupName: IngredientTypes,
	data: MenuItem[],
}
const MenuGroup = (props: GroupProps) => {
	let menuItems: JSX.Element[] = []
	for (var i = 0; i < props.data.length; i++) {
		menuItems.push(
			<MenuItemRow item={props.data[i]} type={props.groupName} key={i} />
		)
	}

	return (
		<>
			<View style={{ width: "100%", marginTop: 10 }}>
				<Text style={{ textAlign: "center", fontSize: 20, marginBottom: 10 }}>{IngredientTypes[props.groupName]}</Text>
				<View style={{ flexDirection: "row", flexWrap: "wrap" }}>
					{menuItems}
				</View>
			</View>
		</>
	)
}

type ItemProps = {
	item: MenuItem,
	type: IngredientTypes,
}
const MenuItemRow = (props: ItemProps) => {
	const { isInOrder, changeMain, changeRice, changeToppings } = useContext(ManualOrderContext)

	let orderSetter: Function
	switch (props.type) {
		case IngredientTypes.Rice:
			orderSetter = changeRice
			break
		case IngredientTypes.Mains:
			orderSetter = changeMain
			break
		case IngredientTypes.Toppings:
			orderSetter = changeToppings
			break
		default:
			break
	}

	return (
		<>
			<TouchableOpacity onPress={() => orderSetter(props.item)} style={{ width: "50%" }}>
				<Text style={{ textAlign: "center", padding: 10, backgroundColor: (isInOrder(props.item, props.type)) ? "darkgreen" : "darkblue" }}>{props.item.name}</Text>
			</TouchableOpacity>
		</>
	)
}