import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native"

import mockData from '../../mockData';
import FooterWithButton from "../components/footerWithButton";
import Header from "../components/header";
import MenuGroup from "./menuGroup";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NavigatorParams } from "../../App";
import { useEffect, useState } from "react";
import { MenuItem } from "../utils";


type Props = NativeStackScreenProps<NavigatorParams, "MainMenu">

const MainMenu = ({ route, navigation }: Props) => {
	const [bestsellers, setBestsellers] = useState<Array<MenuItem>>([])
	const [drinks, setDrinks] = useState<Array<MenuItem>>([])

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
				<ScrollView style={styles.scrollView}>
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
	scrollView: {
		paddingTop: 5,
		marginBottom: 80,
	}
})

const getMenuGroup = async (groupName: string) => {
	return fetch(`https://lets-box-rn.onrender.com/menu-${groupName}`)
		.then(res => res.json())
		.then(data => data)
}

export default MainMenu;