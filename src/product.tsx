import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import Header from "./header"
import { MenuItem } from "./menuUtils"

interface Props {
	product: MenuItem,
}

const ProductScreen = () => {
	let props: MenuItem = {
		imageUrl: "",
		name: "American Nuggies",
		description: "Brown Rice, Chicken Nuggets, and Tempura Flakes"
	}

	return (
		<>
			<Header />
			<ScrollView style={styles.container} contentContainerStyle={{alignItems: "center"}}>
				<Image style={styles.imageContainer} source={require("../assets/food.png")}/>
				<View style={styles.productInfo}>
					<Text style={styles.productName}>{props.name}</Text>
					<Text style={styles.productDescription}>{props.description}</Text>
				</View>
				<View style={styles.sizesContainer}>
					<Text style={styles.sizeLabel}>Size</Text>
					<View style={styles.sizesPicker}>
						<Pressable style={styles.size}><Text>Lightweight</Text></Pressable>
						<Pressable style={styles.size}><Text>Mediumweight</Text></Pressable>
						<Pressable style={styles.size}><Text>Heavyweight</Text></Pressable>
					</View>
				</View>
				<View style={styles.qtyContainer}>
					<Text style={styles.qtyBtn}>-</Text>
					<Text style={styles.qty}>2</Text>
					<Text style={styles.qtyBtn}>+</Text>
				</View>
			</ScrollView>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		padding: 30,
	},

	imageContainer: {
		marginBottom: 20,
	},

	productInfo: {
		marginBottom: 20,
	},
	productName: {
		textAlign: "center",
		fontSize: 40,
	},
	productDescription: {
		textAlign: "center"
	},

	sizesContainer: {
		width: "80%",
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 20,
	},
	sizeLabel: {
		fontSize: 30,
	},
	sizesPicker: {},
	size: {
		paddingVertical: 10,
		fontSize: 20,
		textAlign: "right",
	},

	qtyContainer: {
		width: "80%",
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-around",
	},
	qtyBtn: {
		fontSize: 30,
	},
	qty: {
		fontSize: 30,
	},
})

export default ProductScreen