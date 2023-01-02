import { createContext, useEffect, useState } from "react";
import { extrasPrice, MenuItem, FinalizedMenuItem, manualOrderName, ProductType, BASE_URL, ProductSizeNames, productSizes } from "../../utils";

export enum IngredientTypes {
	"Rice", "Mains", "Toppings"
}

type ManualOrder = {
	[IngredientTypes.Rice]?: MenuItem,
	[IngredientTypes.Mains]?: MenuItem,
	[IngredientTypes.Toppings]: MenuItem[],
}

type ManualOrderContext = {
	choices: ManualOrder,
	changeRice: (choice: MenuItem) => void,
	changeMain: (choice: MenuItem) => void,
	changeToppings: (choice: MenuItem) => void,
	isInOrder: (item: MenuItem, category: IngredientTypes) => boolean,
	getTotalPrice: (quantity: number, size: ProductSizeNames) => number,
	getExtraPrice: () => number,
	createFinalizedMenuItem: (quantity: number, size: ProductSizeNames) => Promise<FinalizedMenuItem>,
}

export const ManualOrderContext = createContext({} as ManualOrderContext)

type OrderProviderProps = { children: JSX.Element[] | JSX.Element }
export const ManualOrderProvider = ({ children }: OrderProviderProps) => {
	const [choices, setChoices] = useState<ManualOrder>({ [IngredientTypes.Toppings]: [] })

	// Log changes to choices
	// useEffect(() => {
	// 	console.log(choices)
	// }, [choices])

	// Change choice if different choice
	const changeRice = (choice: MenuItem) => {
		if (choices[IngredientTypes.Rice]?._id !== choice._id) {
			setChoices({ ...choices, [IngredientTypes.Rice]: choice })
		}
	}

	const changeMain = (choice: MenuItem) => {
		if (!choices[IngredientTypes.Mains] || (choices[IngredientTypes.Mains]?._id !== choice._id)) {
			setChoices({ ...choices, [IngredientTypes.Mains]: choice })
		}
	}

	// Add choice if not yet chosen
	// Remove choice if chosen
	const changeToppings = (choice: MenuItem) => {
		if (choices[IngredientTypes.Toppings].find(v => v._id === choice._id)) { // If choice has already been chosen
			setChoices({ ...choices, [IngredientTypes.Toppings]: choices[IngredientTypes.Toppings].filter(v => v._id !== choice._id) })
		} else {
			setChoices({ ...choices, [IngredientTypes.Toppings]: [...choices[IngredientTypes.Toppings], choice] })
		}
	}

	const isInOrder = (item: MenuItem, category: IngredientTypes) => {
		if (category !== IngredientTypes.Toppings) {
			return choices[category]?._id === item._id
		} else {
			return (choices[category].find(v => v._id === item._id) !== undefined)
		}
	}

	const getTotalPrice = (quantity: number, size: ProductSizeNames) => {
		if (size < 0) return 0
		return quantity * productSizes[size][1]
	}

	const getExtraPrice = () => {
		return (choices[IngredientTypes.Toppings].length < 1) ? 0 : (choices[IngredientTypes.Toppings].length - 1) * extrasPrice
	}

	const createFinalizedMenuItem = async (quantity: number, size: ProductSizeNames) => {
		let description: string = `${choices[IngredientTypes.Rice]?.name} Rice, ${choices[IngredientTypes.Mains]?.name},`

		if (choices[IngredientTypes.Toppings].length === 1) {
			description += ` and ${choices[IngredientTypes.Toppings][0].name}`
		} else {
			choices[IngredientTypes.Toppings].forEach((value, index) => {
				if (index >= choices[IngredientTypes.Toppings].length - 1) {
					description += ` and ${value.name}`
					return
				}
				description += ` ${value.name},`
			})
		}

		let id: string = ""
		await fetch(`${BASE_URL}newId`)
			.then(res => res.json())
			.then(data => id = data)
			.catch(err => console.error(err))

		let finalizedMenuItem: FinalizedMenuItem = {
			id,
			name: manualOrderName,
			description,
			type: ProductType.Food,
			quantity,
			size,
		}
		return finalizedMenuItem
	}

	return (
		<>
			<ManualOrderContext.Provider value={{
				choices,
				changeRice,
				changeMain,
				changeToppings,
				isInOrder,
				getTotalPrice,
				getExtraPrice,
				createFinalizedMenuItem
			}}>
				{children}
			</ManualOrderContext.Provider>
		</>
	)
}