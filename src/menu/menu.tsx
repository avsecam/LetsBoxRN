import { Pressable, ScrollView, StyleSheet, View } from "react-native"

import mockData from '../../mockData';
import FooterWithButton from "../components/footerWithButton";
import Header from "../components/header";
import MenuGroup from "./menuGroup";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NavigatorParams } from "../../App";


type Props = NativeStackScreenProps<NavigatorParams, "MainMenu">

const MainMenu = ({ route, navigation }: Props) => {

	return (
		<>
			<Header />
			<ScrollView>
				<MenuGroup groupName={mockData[0].groupName} data={mockData[0].groupData} />
				<MenuGroup groupName={mockData[1].groupName} data={mockData[1].groupData} />
			</ScrollView>
			<FooterWithButton buttonText="MANUAL ORDER" />
		</>
	)
}

const styles = StyleSheet.create({

})

export default MainMenu;