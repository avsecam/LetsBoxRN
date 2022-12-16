import { Image, Text, View } from "react-native"

export type MenuItem = {
	imageUrl?: string,
	name: string,
	description: string,
	price: number,
}

const MenuItemRow = (menuItem: MenuItem) => {
	return (
		<>
			<View>
				<Image source={{uri: menuItem.imageUrl}}></Image>
				<View>
					<Text>
						{menuItem.name}
					</Text>
					<Text>
						{menuItem.description}
					</Text>
					<Text>
						{menuItem.price.toFixed(2)}
					</Text>
				</View>
			</View>
		</>
	)
}

export default MenuItemRow