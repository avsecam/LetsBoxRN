import React, { createContext, useState } from 'react';
import type { ReactNode } from 'react';
import MainMenu from './src/menu/menu';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductScreen from './src/product/product';
import { FinalizedMenuItem, MenuItem, Order } from './src/utils';
import OrderScreen from './src/order/order';
import { OrderProvider } from './src/order/orderUtils';
import { ManualOrderScreen } from './src/menu/manual/manualOrder';

export type NavigatorParams = {
	MainMenu: undefined,
	Product: { item: MenuItem },
	Cart: undefined,
	Manual: undefined,
}

const Stack = createNativeStackNavigator<NavigatorParams>();

const App: () => ReactNode = () => {
	return (
		<>
			<OrderProvider>
				<NavigationContainer theme={DarkTheme}>
					<Stack.Navigator initialRouteName="MainMenu" screenOptions={{ headerShown: false }}>
						<Stack.Screen name="MainMenu" component={MainMenu} />
						<Stack.Screen name="Product" component={ProductScreen} />
						<Stack.Screen name="Cart" component={OrderScreen} />
						<Stack.Screen name="Manual" component={ManualOrderScreen} />
					</Stack.Navigator>
				</NavigationContainer>
			</OrderProvider>
		</>
	)
}

export default App
