import { createContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { extrasPrice, MenuItem, FinalizedMenuItem, manualOrderName, ProductType, BASE_URL } from "../../utils";

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
	getExtraPrice: () => number,
	createMenuItem: () => MenuItem,
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

	const getExtraPrice = () => {
		return choices[IngredientTypes.Toppings].length * extrasPrice
	}

	const createMenuItem = () => {
		let description: string = `${choices[IngredientTypes.Rice]?.name}, ${choices[IngredientTypes.Mains]?.name}, `

		if (choices[IngredientTypes.Toppings].length === 1) {
			description += `and ${choices[IngredientTypes.Toppings][0].name}`
		} else {
			choices[IngredientTypes.Toppings].forEach((value, index) => {
				if (index >= choices[IngredientTypes.Toppings].length) {
					description += `and `
				}
				description += `, ${value.name}`
			})
		}

		let id: string = ""
		fetch(`${BASE_URL}newId`)
			.then(res => console.log(res))
			.catch(err => console.error(err))

		let menuItem: MenuItem = {
			_id: id,
			name: manualOrderName,
			description,
			type: ProductType.Food,
		}

		return menuItem
	}

	return (
		<>
			<ManualOrderContext.Provider value={{ choices, changeRice, changeMain, changeToppings, isInOrder, getExtraPrice, createMenuItem }}>
				{children}
			</ManualOrderContext.Provider>
		</>
	)
}