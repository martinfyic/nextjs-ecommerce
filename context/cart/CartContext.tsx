import { Context, createContext } from 'react';

import { ICartProduct } from '@/interfaces';

interface ContextProps {
	cart: ICartProduct[];
}

export const CartContext: Context<ContextProps> = createContext(
	{} as ContextProps
);
