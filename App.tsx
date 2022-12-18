import React from 'react';
import type { ReactNode } from 'react';
import MainMenu from './src/menu/menu';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductScreen from './src/product/product';

let Stack = createNativeStackNavigator();

const App: () => ReactNode = () => {
	return (
		<>
			{/* <NavigationContainer> */}
			{/* <Stack.Navigator> */}
			{/* <Stack.Screen name="MainMenu" component={MainMenu}/> */}
			{/* <Stack.Screen name="Product" component={MainMenu}/> */}
			{/* </Stack.Navigator> */}
			{/* </NavigationContainer> */}
			<ProductScreen />
		</>
	);
};

export default App;
