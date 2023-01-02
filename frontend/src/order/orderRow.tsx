import { Image, Text, View } from "react-native"
import { FinalizedMenuItem, ProductSizeNames } from "../utils"

type Props = {
	item: FinalizedMenuItem,
}

export const OrderRow = (props: Props) => {
	return (
		<>
			<View>
				<Image source={(props.item.imageUrl) ? { uri: props.item.imageUrl } : require("../../assets/food.png")} />
				<Text>{props.item.name}</Text>
				<Text>{props.item.description}</Text>
				{(props.item.size) ? <Text>{ProductSizeNames[props.item.size]}</Text> : null}
			</View>
		</>
	)
}