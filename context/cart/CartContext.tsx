import { Context, createContext } from 'react';

import { ICartProduct } from '@/interfaces';

interface ContextProps {
	isLoaded: boolean;
	cart: ICartProduct[];
	order: {
		numberOfItems: number;
		subTotal: number;
		tax: number;
		total: number;
	};
	addProductToCart: (product: ICartProduct) => void;
	updateCartQuantity: (product: ICartProduct) => void;
	removeCartProduct: (product: ICartProduct) => void;
}

export const CartContext: Context<ContextProps> = createContext(
	{} as ContextProps
);
