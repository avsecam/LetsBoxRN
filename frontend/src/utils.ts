export const userId: number = 0 // Temp

export const drinkPrice: number = 30
export const extrasPrice: number = 20

export const manualOrderName: string = "Manual Order"


export enum ProductType {
	"Food",
	"Drink",
}

export enum ProductSizeNames {
	"Featherweight",
	"Welterweight",
	"Heavyweight",
}

export const productSizes: [ProductSizeNames, number][] = [
	[ProductSizeNames.Featherweight, 129],
	[ProductSizeNames.Welterweight, 149],
	[ProductSizeNames.Heavyweight, 169],
]

export type MenuItem = {
	_id: string,
	imageUrl?: string,
	name: string,
	description?: string,
	type: ProductType
}

/**
 * For bestsellers and drinks: MenuItem with size picked
 * For manual orders: MenuItem with description containing ingredients and size picked
 */
export type FinalizedMenuItem = {
	id?: string,
	imageUrl?: string,
	name: string,
	description: string,
	size: ProductSizeNames,
	quantity: number,
	type: ProductType,
}

export type Order = {
	items: FinalizedMenuItem[],
}

export const getTotal = (item: MenuItem | FinalizedMenuItem, quantity: number, size: ProductSizeNames) => {
	switch (item.type) {
		case ProductType.Food:
			if (size < 0) return 0
			return quantity * productSizes[size][1]
		case ProductType.Drink:
			return quantity * drinkPrice
	}
}

export const getMenuGroup = async (groupName: string) => {
	return fetch(`https://lets-box-rn.onrender.com/menu-${groupName}`)
		.then(res => res.json())
		.catch(err => console.error(err))

}