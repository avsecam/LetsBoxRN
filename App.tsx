import React, { createContext, useState } from 'react';
import type { ReactNode } from 'react';
import MainMenu from './src/menu/menu';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductScreen from './src/product/product';
import { FinalizedMenuItem, MenuItem, Order } from './src/utils';
import CartScreen from './src/cart/cart';

export type NavigatorParams = {
	MainMenu: undefined,
	Product: { item: MenuItem },
	Cart: undefined,
}

export const OrderContext = createContext({
	order: {} as Order,
	addToOrder: (item: FinalizedMenuItem) => { },
	removeFromOrder: (item: FinalizedMenuItem) => { },
})

let Stack = createNativeStackNavigator<NavigatorParams>();

const App: () => ReactNode = () => {
	const [order, setOrder] = useState({ items: [] } as Order)

	const addToOrder = (item: FinalizedMenuItem) => {
		setOrder({ items: [...order.items, item] })
	}

	const removeFromOrder = (item: FinalizedMenuItem) => {
		setOrder(
			{ items: order.items.filter((queryItem: FinalizedMenuItem) => queryItem.name !== item.name) }
		)
	}

	return (
		<>
			<OrderContext.Provider value={{ order, addToOrder, removeFromOrder }}>
				<NavigationContainer theme={DarkTheme}>
					<Stack.Navigator initialRouteName="MainMenu" screenOptions={{ headerShown: false }}>
						<Stack.Screen name="MainMenu" component={MainMenu} />
						<Stack.Screen name="Product" component={ProductScreen} />
						<Stack.Screen name="Cart" component={CartScreen} />
					</Stack.Navigator>
				</NavigationContainer>
			</OrderContext.Provider>
		</>
	)
}

export default App