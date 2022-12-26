import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { StyleSheet, Text, View } from "react-native"
import { NavigatorParams } from "../../App"

const Header = () => {
	const navigation = useNavigation<NativeStackNavigationProp<NavigatorParams>>()

	return (
		<>
			<View style={styles.header}>
				<Text>Brgr</Text>
				<Text>Logo</Text>
				<Text onPress={() => navigation.navigate("Cart")}>Cart</Text>
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	header: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 20,
		backgroundColor: "gray",
	},
})

export default Header