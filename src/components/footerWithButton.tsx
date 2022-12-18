import { Pressable, StyleSheet, Text, View } from "react-native"

const FooterWithButton = () => {
	return (
		<>
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

export default FooterWithButton