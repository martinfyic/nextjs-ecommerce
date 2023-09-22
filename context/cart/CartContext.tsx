import { Context, createContext } from 'react';

import { ICartProduct } from '@/interfaces';

interface ContextProps {
	cart: ICartProduct[];
	addProductToCart: (product: ICartProduct) => void;
}

export const CartContext: Context<ContextProps> = createContext(
	{} as ContextProps
);
