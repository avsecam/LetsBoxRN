import { createContext, useContext, useState } from "react";
import { MenuItem } from "../../utils";

type ManualOrder = {
	rice?: MenuItem,
	main?: MenuItem,
	toppings: MenuItem[],
}

const ManualOrderContext = createContext({
	choices: {} as ManualOrder,
	changeRice: (choice: MenuItem) => { },
	changeMain: (choice: MenuItem) => { },
	changeToppings: (choice: MenuItem) => { },
})

export const useManualOrder = () => useContext(ManualOrderContext)

type OrderProviderProps = { children: JSX.Element }
export const ManualOrderProvider = ({ children }: OrderProviderProps) => {
	const [choices, setChoices] = useState<ManualOrder>({ toppings: [] })

	// Change choice if different choice
	const changeRice = (choice: MenuItem) => {
		if (choices.rice?._id !== choice._id) {
			setChoices({ ...choices, rice: choice })
		}
	}

	const changeMain = (choice: MenuItem) => {
		if (choices.main?._id !== choice._id) {
			setChoices({ ...choices, main: choice })
		}
	}

	// Add choice if not yet chosen
	// Remove choice if chosen
	const changeToppings = (choice: MenuItem) => {
		if (choices.toppings.find(v => v._id === choice._id)) { // If choice has already been chosen
			setChoices({ ...choices, toppings: choices.toppings.filter(v => v._id !== choice._id) })
		} else {
			setChoices({ ...choices, toppings: [...choices.toppings, choice] })
		}
	}

	return (
		<>
			<ManualOrderContext.Provider value={{ choices, changeRice, changeMain, changeToppings }}>
				{children}
			</ManualOrderContext.Provider>
		</>
	)
}
