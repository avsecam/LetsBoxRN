import { Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"

import FooterWithButton from "../components/footerWithButton";
import Header from "../components/header";
import MenuGroup from "./menuGroup";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { NavigatorParams } from "../../App";
import { useEffect, useState } from "react";
import { getMenuGroup, MenuItem } from "../utils";
import { useNavigation } from "@react-navigation/native";


type Props = NativeStackScreenProps<NavigatorParams, "MainMenu">

const MainMenu = ({ route }: Props) => {
	const [bestsellers, setBestsellers] = useState<Array<MenuItem>>([])
	const [drinks, setDrinks] = useState<Array<MenuItem>>([])
	const navigation = useNavigation<NativeStackNavigationProp<NavigatorParams>>()

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
					<MenuGroup groupName="Drinks" data={drinks} extraStyle={{ marginBottom: 10 }} />
					<View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginHorizontal: 20 }}>
						<View style={{ flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: "white" }} />
						<Text style={{ width: "20%", textAlign: "center" }}>OR</Text>
						<View style={{ flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: "white" }} />
					</View>
					<FooterWithButton buttonText="CREATE A MANUAL ORDER" onPress={() => navigation.navigate("Manual1")} extraStyle={{
						marginVertical: 10,
					}}/>
				</ScrollView>
				:
				<Text>Loading...</Text>
			}
		</>
	)
}

const styles = StyleSheet.create({
	scrollView: {
		paddingTop: 5,
	}
})

export default MainMenu;