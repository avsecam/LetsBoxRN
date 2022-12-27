import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

type ButtonProps = {
	sizeName: string,
	price: number,
	onPress: () => void,
	isChosen: boolean,
	qtyInOrder?: number,
}

const SizeButton = (props: ButtonProps) => {
	return (
		<>
			<TouchableOpacity style={[styles.radioButton, (props.isChosen) ? styles.radioButtonChosen : null]} onPress={props.onPress}>
				<View style={styles.sizeInfo}>
					<Text style={styles.radioButtonText}>{props.sizeName}</Text>
					<Text style={[styles.radioButtonText, styles.radioButtonPrice]}>P{props.price.toFixed(2)}</Text>
				</View>
				<View style={styles.qtyInfo}>
					<Text>{(props.qtyInOrder !== undefined) ? `${props.qtyInOrder} in order` : null}</Text>
				</View>
			</TouchableOpacity>
		</>
	)
}

const styles = StyleSheet.create({
	radioButton: {
		flexDirection: "row",
		padding: 10,
		borderRadius: 10,
	},
	radioButtonChosen: {
		backgroundColor: "green",
	},
	
	sizeInfo: {
		flexDirection: "row",
		justifyContent: "space-between",
		flex: 2,
	},
	qtyInfo: {
		flexDirection: "row",
		justifyContent: "flex-end",
		flex: 1,
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