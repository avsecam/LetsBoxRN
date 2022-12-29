import { useEffect, useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import Header from "../../components/header"
import { getMenuGroup, MenuItem } from "../../utils"
import { ManualOrderProvider, useManualOrder } from "./utils"

type ManualOrderItems = {
	rice?: MenuItem[],
	mains?: MenuItem[],
	toppings?: MenuItem[],
}



export const ManualOrderScreen = () => {
	const [items, setItems] = useState<ManualOrderItems>({}) // Contains all manual order menu items

	const { choices, changeMain, changeRice, changeToppings } = useManualOrder()

	useEffect(() => {
		(async () => {
			const rice = await getMenuGroup("manual-rice")
			const mains = await getMenuGroup("manual-main")
			const toppings = await getMenuGroup("manual-toppings")

			const newItems = { rice, mains, toppings }

			setItems(newItems)
		})()
	}, [])

	return (
		<>
			<ManualOrderProvider>
				<View>
					<Header />
					<View>
						<MenuGroup groupName="Rice" data={items.rice} orderSetter={changeRice}/>
						<MenuGroup groupName="Mains" data={items.mains} orderSetter={changeMain} />
						<MenuGroup groupName="Toppings" data={items.toppings} multiChoice={true} orderSetter={changeToppings} />
					</View>
				</View>
			</ManualOrderProvider>
		</>
	)
}

type GroupProps = {
	groupName: string,
	data?: MenuItem[],
	multiChoice?: boolean,
	orderSetter: (item: MenuItem) => void,
}
const MenuGroup = (props: GroupProps) => {
	if (!props.data) {
		props.data = []
	}

	let menuItems: JSX.Element[] = []
	for (var i = 0; i < ((props.data) ? props.data.length : 0); i++) {
		menuItems.push(
			<MenuItemRow item={props.data[i]} />
		)
	}

	return (
		<>
			<View style={{ width: "100%", marginTop: 10 }}>
				<Text style={{ textAlign: "center", fontSize: 20, marginBottom: 10 }}>{props.groupName}</Text>
				<View style={{ flexDirection: "row", flexWrap: "wrap" }}>
					{menuItems}
				</View>
			</View>
		</>
	)
}

type MenuItemRowProps = {
	item: MenuItem,
	onPress?: () => void,
	isChosen?: boolean,
}
const MenuItemRow = (props: MenuItemRowProps) => {
	return (
		<>
			<TouchableOpacity onPress={props.onPress} style={{ width: "50%" }}>
				<Text style={{ textAlign: "center", padding: 10, backgroundColor: (props.isChosen) ? "darkgreen" : "darkblue" }}>{props.item.name}</Text>
			</TouchableOpacity>
		</>
	)
}