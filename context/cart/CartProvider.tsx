import { FC, ReactNode, useReducer } from 'react';
import { CartContext, cartReducer } from './';
import { ICartProduct } from '../../interfaces/cart';

export interface CartState {
	cart: ICartProduct[];
}

const CART_INITIAL_STATE: CartState = {
	cart: [],
};

interface Props {
	children?: ReactNode;
}

export const CartProvider: FC<Props> = ({ children }) => {
	const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);
	const addProductToCart = (product: ICartProduct) => {
		const existProductInCart = state.cart.some(p => p._id === product._id);
		if (!existProductInCart)
			return dispatch({
				type: '[Cart] - Update Cart',
				payload: [...state.cart, product],
			});

		const productInCartDiffSize = state.cart.some(
			p => p._id === product._id && p.size === product.size
		);
		if (!productInCartDiffSize)
			return dispatch({
				type: '[Cart] - Update Cart',
				payload: [...state.cart, product],
			});

		const updatedProduct = state.cart.map(p => {
			if (p._id !== product._id) return p;
			if (p.size !== product.size) return p;

			p.quantity += product.quantity;

			return p;
		});

		dispatch({ type: '[Cart] - Update Cart', payload: updatedProduct });
	};

	return (
		<CartContext.Provider value={{ ...state, addProductToCart }}>
			{children}
		</CartContext.Provider>
	);
};
