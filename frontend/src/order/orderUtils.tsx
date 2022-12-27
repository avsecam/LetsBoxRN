import { createContext, useContext, useState } from "react"
import { Order, FinalizedMenuItem } from "../utils"

export const OrderContext = createContext({
	order: {} as Order,
	addToOrder: (item: FinalizedMenuItem) => { },
	removeFromOrder: (item: FinalizedMenuItem) => { },
})

export const useOrder = () => useContext(OrderContext)

type OrderProviderProps = { children: JSX.Element }
export const OrderProvider = ({ children }: OrderProviderProps) => {
	const [order, setOrder] = useState<Order>({ items: [] })

	const addToOrder = (item: FinalizedMenuItem) => {
		// TODO: Check if item already exists. Check id and size.
		setOrder({ items: [...order.items, item] })
	}

	const removeFromOrder = (item: FinalizedMenuItem) => {
		setOrder(
			{ items: order.items.filter((queryItem: FinalizedMenuItem) => queryItem.id !== item.id) }
		)
	}

	return (
		<>
			<OrderContext.Provider value={{ order, addToOrder, removeFromOrder }}>
				{children}
			</OrderContext.Provider>
		</>
	)
}

export const addToCart = () => { }