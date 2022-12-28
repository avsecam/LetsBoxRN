import { createContext, useContext, useState } from "react"
import { Order, FinalizedMenuItem, userId } from "../utils"

export const OrderContext = createContext({
	order: {} as Order,
	addToOrder: (item: FinalizedMenuItem) => { }, // Add or update order
	removeFromOrder: (item: FinalizedMenuItem) => { },
	confirmOrder: () => { },
})

export const useOrder = () => useContext(OrderContext)

type OrderProviderProps = { children: JSX.Element }
export const OrderProvider = ({ children }: OrderProviderProps) => {
	const [order, setOrder] = useState<Order>({ items: [] })

	const addToOrder = (item: FinalizedMenuItem) => {
		// Check if item already exists. Check id and size.
		const existingItemWithSize: FinalizedMenuItem | undefined = order.items.find(v => v.id === item.id && v.size === item.size)

		if (existingItemWithSize) {
			setOrder({
				items: order.items.map(v => {
					if (v.id === item.id) {
						return { ...v, quantity: item.quantity }
					} else {
						return v
					}
				})
			})
		} else {
			setOrder({ items: [...order.items, item] })
		}
	}

	const removeFromOrder = (item: FinalizedMenuItem) => {
		setOrder(
			{ items: order.items.filter((queryItem: FinalizedMenuItem) => queryItem.id !== item.id) }
		)
	}

	const confirmOrder = async () => {
		const stringifiedOrder = JSON.stringify(order)
		await fetch(`https://lets-box-rn.onrender.com/add-order-user-${userId}-${stringifiedOrder}`)
	}

	return (
		<>
			<OrderContext.Provider value={{ order, addToOrder, removeFromOrder, confirmOrder }}>
				{children}
			</OrderContext.Provider>
		</>
	)
}

export const addToCart = () => { }