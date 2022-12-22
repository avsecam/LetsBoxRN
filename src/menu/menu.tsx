import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native"

import mockData from '../../mockData';
import FooterWithButton from "../components/footerWithButton";
import Header from "../components/header";
import MenuGroup from "./menuGroup";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NavigatorParams } from "../../App";
import { getMenuGroup, MenuItem } from "../utils";
import { useEffect, useState } from "react";


type Props = NativeStackScreenProps<NavigatorParams, "MainMenu">

const MainMenu = ({ route, navigation }: Props) => {
	const [bestsellers, setBestsellers] = useState([])
	const [drinks, setDrinks] = useState([])

	useEffect(() => {
		(async () => {
			setBestsellers(await getMenuGroup("bestsellers"))
			setDrinks(await getMenuGroup("drinks"))
		})()
	}, [])


	return (
		<>
			<Header />
			{(bestsellers.length > 0 && drinks.length > 0) ?
				<ScrollView>
					<MenuGroup groupName="Bestsellers" data={bestsellers} />
					<MenuGroup groupName="Drinks" data={drinks} />
				</ScrollView>
				:
				<Text>Loading...</Text>
			}
			<FooterWithButton buttonText="MANUAL ORDER" />
		</>
	)
}

const styles = StyleSheet.create({

})

export default MainMenu;