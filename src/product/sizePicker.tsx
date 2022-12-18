import { useState } from "react"
import { GestureResponderEvent, Pressable, StyleSheet, Text, View } from "react-native"
import { productSizes } from "../utils"

interface ButtonProps {
	sizeName: string,
	price: number,
	onPress: (e: GestureResponderEvent) => void,
	isChosen: boolean,
}

const SizeButton = (props: ButtonProps) => {
	return (
		<>
			<Pressable style={[styles.radioButton, (props.isChosen) ? styles.radioButtonChosen : null]} onPress={props.onPress}>
				<Text style={styles.radioButtonText}>{props.sizeName}</Text>
			</Pressable>
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
				onPress={(e: GestureResponderEvent) => {
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
	sizesPicker: {},
	
	radioButton: {
		paddingVertical: 5,
	},
	radioButtonChosen: {
		backgroundColor: "cyan",
	},
	radioButtonText: {
		textAlign: "right",
	},
})

export default SizePicker