import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

type Props = {
	buttonText: string,
	onPress?: () => void,
	sticky?: boolean,
	extraStyle?: {},
}

const FooterWithButton = (props: Props) => {
	return (
		<>
			<View style={(props.sticky) ? {
				...styles.footer, ...props.extraStyle,
				position: "absolute",
				bottom: 0
			} : {...styles.footer, ...props.extraStyle}}>
				<TouchableOpacity style={styles.footerBtn} onPress={props.onPress}>
					<Text style={styles.footerBtnText}>{props.buttonText}</Text>
				</TouchableOpacity>
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	footer: {
		padding: 10,
		width: "100%",
		height: 80,
		justifyContent: "center",
		backgroundColor: "gray",
	},
	footerBtn: {
		borderRadius: 5,
		height: "100%",
		width: "100%",
		backgroundColor: "red",
		justifyContent: "center",
	},
	footerBtnText: {
		textAlign: "center",
		fontSize: 20,
		textTransform: "uppercase",
	}
})

export default FooterWithButton