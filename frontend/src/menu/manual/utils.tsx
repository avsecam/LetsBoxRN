import { createContext, useContext, useEffect, useState } from "react";
import { MenuItem } from "../../utils";

export enum IngredientTypes {
	"Rice", "Mains", "Toppings"
}

type ManualOrder = {
	[IngredientTypes.Rice]?: MenuItem,
	[IngredientTypes.Mains]?: MenuItem,
	[IngredientTypes.Toppings]: MenuItem[],
}

const ManualOrderContext = createContext({
	choices: {} as ManualOrder,
	changeRice: (choice: MenuItem) => { },
	changeMain: (choice: MenuItem) => { },
	changeToppings: (choice: MenuItem) => { },
	isInOrder: (item: MenuItem, category: IngredientTypes) => Boolean(),
})

export const useManualOrder = () => useContext(ManualOrderContext)

type OrderProviderProps = { children: JSX.Element }
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

	return (
		<>
			<ManualOrderContext.Provider value={{ choices, changeRice, changeMain, changeToppings, isInOrder }}>
				{children}
			</ManualOrderContext.Provider>
		</>
	)
}
