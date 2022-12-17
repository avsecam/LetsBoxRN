import { Pressable, FlatList, ScrollView, StyleSheet, View } from "react-native"
import { Text } from "react-native"

import mockData from '../mockData.json';
import Header from "./header";
import MenuGroup from "./menuGroup";

const MainMenu = () => {
	let menuGroups: JSX.Element[] = []
	for (var i = 0; i < mockData.length; i++) {
		menuGroups.push(
			<MenuGroup groupName={mockData[i].groupName} data={mockData[i].groupData} key={i}/>
		)
	}

	return (
		<>
			<Header />
			<ScrollView>
				{menuGroups}
			</ScrollView>
			<View style={styles.footer}>
				<Pressable style={styles.footerBtn}>
					<Text style={styles.footerBtnText}>Manual Order</Text>
				</Pressable>
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	footer: {
		padding: 10,
		height: 80,
		display: "flex",
		justifyContent: "center",
	},
	footerBtn: {
		borderRadius: 5,
		height: "100%",
		width: "100%",
		backgroundColor: "red",
		display: "flex",
		justifyContent: "center",
	},
	footerBtnText: {
		textAlign: "center",
		fontSize: 20,
		textTransform: "uppercase",
	}
})

export default MainMenu;