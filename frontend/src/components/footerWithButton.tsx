import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

interface Props {
	buttonText: string,
	onPress?: () => void,
}

const FooterWithButton = (props: Props) => {
	return (
		<>
			<View style={styles.footer}>
				<TouchableOpacity style={styles.footerBtn} onPress={props.onPress}>
					<Text style={styles.footerBtnText}>{props.buttonText}</Text>
				</TouchableOpacity>
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	footer: {
		position: "absolute",
		bottom: 0,
		padding: 10,
		width: "100%",
		height: 80,
		display: "flex",
		justifyContent: "center",
		backgroundColor: "gray",
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