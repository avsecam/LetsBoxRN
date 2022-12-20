import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

type ButtonProps = {
	sizeName: string,
	price: number,
	onPress: () => void,
	isChosen: boolean,
}

const SizeButton = (props: ButtonProps) => {
	return (
		<>
			<TouchableOpacity style={[styles.radioButton, (props.isChosen) ? styles.radioButtonChosen : null]} onPress={props.onPress}>
				<Text style={styles.radioButtonText}>{props.sizeName}</Text>
				<Text style={[styles.radioButtonText, styles.radioButtonPrice]}>P{props.price.toFixed(2)}</Text>
			</TouchableOpacity>
		</>
	)
}

const styles = StyleSheet.create({
	radioButton: {
		flexDirection: "row",
		padding: 10,
		borderRadius: 10,
		justifyContent: "space-between",
	},
	radioButtonChosen: {
		backgroundColor: "green",
	},
	radioButtonText: {
		textAlign: "center",
		fontSize: 15,
	},
	radioButtonPrice: {
		paddingLeft: 20,
	},
})

export default SizeButton