import { useState, useContext, useEffect } from "react"
import { Alert, View, Text, TouchableOpacity } from "react-native"
import FooterWithButton from "../../components/footerWithButton"
import Header from "../../components/header"
import { extrasPrice, getMenuGroup, MenuItem } from "../../utils"
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

export const ManualOrderContainer = () => {
	const [items, setItems] = useState<ManualOrderItems>({}) // Contains all manual order menu items
	const { getExtraPrice, choices, createMenuItem } = useContext(ManualOrderContext)

	useEffect(() => {
		(async () => {
			const rice = await getMenuGroup("manual-rice")
			const mains = await getMenuGroup("manual-main")
			const toppings = await getMenuGroup("manual-toppings")

			const newItems = { [IngredientTypes.Rice]: rice, [IngredientTypes.Mains]: mains, [IngredientTypes.Toppings]: toppings }

			setItems(newItems)
		})()
	}, [])

	const handleNext = () => {
		if (choices[IngredientTypes.Rice] === undefined
			|| choices[IngredientTypes.Mains] === undefined
			|| choices[IngredientTypes.Toppings].length < 1) {
			Alert.alert("Please complete your order!")
			return
		}

		console.log(createMenuItem())
	}

	return (
		<>
			<View>
				<Header />
				<View>
					<MenuGroup groupName={IngredientTypes.Rice} data={items[IngredientTypes.Rice] ?? []} />
					<MenuGroup groupName={IngredientTypes.Mains} data={items[IngredientTypes.Mains] ?? []} />
					<MenuGroup groupName={IngredientTypes.Toppings} data={items[IngredientTypes.Toppings] ?? []} />
				</View>
				<View>
					<Text>Extra toppings P{extrasPrice}</Text>
					<Text>Extra price: P{`${getExtraPrice()}`}</Text>
				</View>
				<FooterWithButton buttonText="ADD TO ORDER" onPress={handleNext} />
			</View>
		</>
	)
}

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