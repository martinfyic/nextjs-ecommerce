import { FC, ReactNode, useEffect, useReducer } from 'react';
import Cookie from 'js-cookie';

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

	useEffect(() => {
		try {
			const getCookieProducts = Cookie.get('cart')
				? JSON.parse(Cookie.get('cart')!)
				: [];
			dispatch({
				type: '[Cart] - LoadCart from cookies | storage',
				payload: getCookieProducts,
			});
		} catch (error) {
			dispatch({
				type: '[Cart] - LoadCart from cookies | storage',
				payload: [],
			});
		}
	}, []);

	useEffect(() => {
		if (state.cart.length > 0) Cookie.set('cart', JSON.stringify(state.cart));
	}, [state.cart]);

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
