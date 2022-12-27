import React, { createContext, useState } from 'react';
import type { ReactNode } from 'react';
import MainMenu from './src/menu/menu';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductScreen from './src/product/product';
import { FinalizedMenuItem, MenuItem, Order } from './src/utils';
import CartScreen from './src/order/order';
import { OrderProvider } from './src/order/orderUtils';

export type NavigatorParams = {
	MainMenu: undefined,
	Product: { item: MenuItem },
	Cart: undefined,
}

let Stack = createNativeStackNavigator<NavigatorParams>();

const App: () => ReactNode = () => {
	return (
		<>
			<OrderProvider>
				<NavigationContainer theme={DarkTheme}>
					<Stack.Navigator initialRouteName="MainMenu" screenOptions={{ headerShown: false }}>
						<Stack.Screen name="MainMenu" component={MainMenu} />
						<Stack.Screen name="Product" component={ProductScreen} />
						<Stack.Screen name="Cart" component={CartScreen} />
					</Stack.Navigator>
				</NavigationContainer>
			</OrderProvider>
		</>
	)
}

export default App
