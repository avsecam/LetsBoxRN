import { createContext, useContext, useState } from "react"
import { Alert } from "react-native"
import { Order, FinalizedMenuItem, userId } from "../utils"

type OrderContext = {
	order: Order,
	addToOrder: (item: FinalizedMenuItem) => void, // Add or update order
	removeFromOrder: (item: FinalizedMenuItem) => void,
	confirmOrder: () => void,
}

export const OrderContext = createContext({} as OrderContext)

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
		let info: string = "Your order is on its way!"
		await fetch(`https://lets-box-rn.onrender.com/add-order-user-${userId.toString()}`,
			{
				method: "POST",
				headers: {
					"Accept": "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(order)
			}
		)
			.then(() => setOrder({ items: [] })) // Clear order
			.catch(() => info = "Error posting order.")
		Alert.alert("Order Confirmed", info)
	}

	return (
		<>
			<OrderContext.Provider value={{ order, addToOrder, removeFromOrder, confirmOrder }}>
				{children}
			</OrderContext.Provider>
		</>
	)
}