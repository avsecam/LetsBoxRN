import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"

const QuantityPicker = () => {
	let [qty, setQty] = useState(1)

	const handleSetQty = (newQty: number) => {
		setQty((newQty >= 0) ? newQty : 0)
	}

	return (
		<>
			<View style={styles.qtyContainer}>
				<TouchableOpacity style={[styles.qtyBtn, styles.qtyBtnLeft]} onPress={() => handleSetQty(qty - 1)}><Text style={styles.qtyBtnText}>-</Text></TouchableOpacity>
				<Text style={styles.qty}>{qty}</Text>
				<TouchableOpacity style={[styles.qtyBtn, styles.qtyBtnRight]} onPress={() => handleSetQty(qty + 1)}><Text style={styles.qtyBtnText}>+</Text></TouchableOpacity>
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	qtyContainer: {
		width: "80%",
		height: 50,
		display: "flex",
		flexDirection: "row",
	},
	qtyBtn: {
		flex: 1,
		backgroundColor: "purple",
		justifyContent: "center"
	},
	qtyBtnText: {
		fontSize: 40,
		textAlign: "center",
	},
	qtyBtnLeft: {
		borderTopLeftRadius: 10,
		borderBottomLeftRadius: 10,
	},
	qtyBtnRight: {
		borderTopRightRadius: 10,
		borderBottomRightRadius: 10,
	},

	qty: {
		flex: 3,
		backgroundColor: "gray",
		textAlign: "center",
		textAlignVertical: "center",
		fontSize: 30,
	},
})

export default QuantityPicker