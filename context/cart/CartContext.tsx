import { Context, createContext } from 'react';

import { ICartProduct, IShippingAddress } from '@/interfaces';

interface ContextProps {
	isLoaded: boolean;
	cart: ICartProduct[];
	order: {
		numberOfItems: number;
		subTotal: number;
		tax: number;
		total: number;
	};
	shippingAddress?: IShippingAddress;
	addProductToCart: (product: ICartProduct) => void;
	updateCartQuantity: (product: ICartProduct) => void;
	removeCartProduct: (product: ICartProduct) => void;
	updateAddress: (address: IShippingAddress) => void;
}

export const CartContext: Context<ContextProps> = createContext(
	{} as ContextProps
);
