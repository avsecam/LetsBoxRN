import { useState } from "react"
import { StyleSheet, View } from "react-native"
import { Header } from "react-native/Libraries/NewAppScreen"
import FooterWithButton from "../../components/footerWithButton"
import SizeButton from "../../product/sizeButton"
import { productSizes, FinalizedMenuItem, ProductSizeNames } from "../../utils"

type Props = {

}

export const SizeAndQtyScreen = ({ }: Props) => {
	const [chosenSize, setChosenSize] = useState(-1)

	let sizeButtons: JSX.Element[] = []
	for (let i: number = 0; i < productSizes.length; i++) {
		sizeButtons.push(
			<SizeButton
				price={productSizes[i][1]}
				sizeName={ProductSizeNames[productSizes[i][0]]}
				onPress={() => {
					setChosenSize(i)
				}}
				isChosen={(chosenSize === i)}
				key={i} />
		)
	}
	return (
		<>
			<Header />
			<View style={styles.sizesContainer}>
				{sizeButtons}
			</View>
			<FooterWithButton buttonText="ADD TO ORDER" onPress={() => {}} />
		</>
	)
}

const styles = StyleSheet.create({
	// SIZES
	sizesContainer: {
		borderStyle: "solid",
		borderWidth: 1,
		borderRadius: 10,
		borderColor: "white",
		width: "100%",
		display: "flex",
		justifyContent: "space-between",
		padding: 15,
		alignItems: "stretch",
		marginBottom: 20,
	},
	sizeLabel: {
		fontSize: 25,
	},

})