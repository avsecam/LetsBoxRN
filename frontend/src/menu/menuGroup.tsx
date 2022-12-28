import { FlatList, StyleSheet, View } from "react-native"
import { Text } from "react-native"

import MenuItemRow from './menuItemRow';
import { MenuItem, ProductType } from "../utils";

type Props = {
	groupName: string,
	data?: MenuItem[],
	extraStyle?: {},
}

const MenuGroup = (props: Props) => {
	if (!props.data) {
		props.data = []
	}

	let menuItems: JSX.Element[] = []
	for (var i = 0; i < ((props.data) ? props.data.length : 0); i++) {
		menuItems.push(
			<MenuItemRow item={props.data[i]} key={i} />
		)
	}

	return (
		<>
			<View style={props.extraStyle}>
				{(props.groupName) ? <Text style={styles.title}>{props.groupName}</Text> : null}
				{menuItems}
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	title: {
		width: "100%",
		textAlign: "center",
		fontSize: 20,
		paddingVertical: 10,
	},
})

export default MenuGroup;