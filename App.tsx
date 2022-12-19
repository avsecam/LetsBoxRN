import React from 'react';
import type { ReactNode } from 'react';
import MainMenu from './src/menu/menu';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductScreen from './src/product/product';
import { MenuItem } from './src/utils';

export type NavigatorParams = {
	MainMenu: undefined,
	Product: MenuItem,
}

let Stack = createNativeStackNavigator<NavigatorParams>();

const App: () => ReactNode = () => {
	return (
		<>
			<NavigationContainer theme={DarkTheme}>
				<Stack.Navigator initialRouteName="MainMenu" screenOptions={{headerShown: false}}>
					<Stack.Screen name="MainMenu" component={MainMenu} />
					<Stack.Screen name="Product" component={ProductScreen} />
				</Stack.Navigator>
			</NavigationContainer>
		</>
	)
}

export default App