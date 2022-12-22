export const getMenuGroup = async (groupName: string) => {
	return fetch(`https://data.mongodb-api.com/app/lets-box-rn-puunt/endpoint/menuGroups?groupName=${groupName}`)
		.then(res => res.json())
		.then(data => data)
}

export const drinkPrice: number = 30
export const extrasPrice: number = 20


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
	imageUrl?: string,
	name: string,
	description: string,
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
	size?: ProductSizeNames,
	quantity: number,
}

export type Order = {
	id?: string,
	items: FinalizedMenuItem[],
}

export const getTotal = (item: MenuItem, quantity: number, size: ProductSizeNames) => {
	switch (item.type) {
		case ProductType.Food:
			if (size < 0) return 0
			return quantity * productSizes[size][1]
		case ProductType.Drink:
			return quantity * drinkPrice
	}
}