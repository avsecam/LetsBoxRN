import { Pressable, ScrollView, StyleSheet, View } from "react-native"

import mockData from '../../mockData.json';
import FooterWithButton from "../components/footerWithButton";
import Header from "../components/header";
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
			<FooterWithButton buttonText="MANUAL ORDER" />
		</>
	)
}

const styles = StyleSheet.create({

})

export default MainMenu;