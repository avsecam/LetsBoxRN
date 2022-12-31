import { useEffect, useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import Header from "../../components/header"
import { extrasPrice, getMenuGroup, MenuItem } from "../../utils"
import { IngredientTypes, ManualOrderProvider, useManualOrder } from "./utils"

type ManualOrderItems = {
	[IngredientTypes.Rice]?: MenuItem[],
	[IngredientTypes.Mains]?: MenuItem[],
	[IngredientTypes.Toppings]?: MenuItem[],
}



export const ManualOrderScreen = () => {
	const [items, setItems] = useState<ManualOrderItems>({}) // Contains all manual order menu items

	useEffect(() => {
		(async () => {
			const rice = await getMenuGroup("manual-rice")
			const mains = await getMenuGroup("manual-main")
			const toppings = await getMenuGroup("manual-toppings")

			const newItems = { [IngredientTypes.Rice]: rice, [IngredientTypes.Mains]: mains, [IngredientTypes.Toppings]: toppings }

			setItems(newItems)
		})()
	}, [])

	return (
		<>
			<ManualOrderProvider>
				<View>
					<Header />
					<View>
						<MenuGroup groupName={IngredientTypes.Rice} data={items[IngredientTypes.Rice] ?? []} />
						<MenuGroup groupName={IngredientTypes.Mains} data={items[IngredientTypes.Mains] ?? []} />
						<MenuGroup groupName={IngredientTypes.Toppings} data={items[IngredientTypes.Toppings] ?? []} multiChoice={true} />
					</View>
					<View>
						<Text>Extra toppings P{extrasPrice}</Text>
						<Text></Text>
					</View>
				</View>
			</ManualOrderProvider>
		</>
	)
}

type GroupProps = {
	groupName: IngredientTypes,
	data: MenuItem[],
	multiChoice?: boolean,
}
const MenuGroup = (props: GroupProps) => {
	let menuItems: JSX.Element[] = []
	for (var i = 0; i < props.data.length; i++) {
		menuItems.push(
			<MenuItemRow item={props.data[i]} type={props.groupName} key={i}/>
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
	const { isInOrder, changeMain, changeRice, changeToppings } = useManualOrder()

	let orderSetter: Function
	switch(props.type) {
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