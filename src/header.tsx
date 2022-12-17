import { StyleSheet, Text, View } from "react-native"

const Header = () => {
	return (
		<>
			<View style={styles.header}>
				<Text>Brgr</Text>
				<Text>Logo</Text>
				<Text>Cart</Text>
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
		backgroundColor: "#444",
	},
})

export default Header