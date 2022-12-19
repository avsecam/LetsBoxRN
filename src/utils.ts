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
	description: string
}

/**
 * For bestsellers and drinks: MenuItem with size picked
 * For manual orders: MenuItem with description containing ingredients and size picked
 */
export type finalizedMenuItem = {
	imageUrl?: string,
	name: string,
	description: string,
	size: ProductSizeNames
}

export type Order = {
	id: string,

}