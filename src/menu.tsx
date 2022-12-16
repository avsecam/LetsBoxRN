import { FlatList, StyleSheet, View } from "react-native"
import { Text } from "react-native"

import MenuItemRow, { MenuItem } from './menuItemRow';
import mockData from '../mockData.json';

const MainMenu: () => JSX.Element = () => {
	return (
		<>
			<View style={styles.header}>
				<Text>Logo</Text>
				<Text>Brgr</Text>
			</View>
			<FlatList
				data={Object.create(mockData)}
				renderItem={({ item }) => (
					<MenuItemRow description={item.description} name={item.name} price={item.price}></MenuItemRow>
				)}
			/>

		</>
	)
}

const styles = StyleSheet.create({
	header: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 20,
	},
})

export default MainMenu;