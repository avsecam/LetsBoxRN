import { useState } from "react"
import { GestureResponderEvent, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { productSizes } from "../utils"

interface ButtonProps {
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
			</TouchableOpacity>
		</>
	)
}

const SizePicker = () => {
	let [chosenSize, setChosenSize] = useState(0)

	let sizeButtons: Array<JSX.Element> = []
	for (let i: number = 0; i < productSizes.length; i++) {
		sizeButtons.push(
			<SizeButton
				price={productSizes[i][1]}
				sizeName={productSizes[i][0]}
				onPress={() => {
					setChosenSize(i)
				}}
				isChosen={(chosenSize === i)}
				key={i} />
		)
	}

	return (
		<>
			<View style={styles.sizesPicker}>
				{sizeButtons}
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	sizesPicker: {
		display: "flex",
		alignItems: "flex-end",
	},
	
	radioButton: {
		padding: 10,
		borderRadius: 10,
	},
	radioButtonChosen: {
		backgroundColor: "green",
	},
	radioButtonText: {
		textAlign: "center",
		fontSize: 15,
	},
})

export default SizePicker