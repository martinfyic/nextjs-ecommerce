import { FC, ReactNode, useEffect, useReducer } from 'react';
import Cookie from 'js-cookie';

import { CartContext, cartReducer } from './';
import { ICartProduct, IOrderSummary } from '../../interfaces';

export interface CartState {
	isLoaded: boolean;
	cart: ICartProduct[];
	order: IOrderSummary;
}

const CART_INITIAL_STATE: CartState = {
	isLoaded: false,
	cart: [],
	order: {
		numberOfItems: 0,
		subTotal: 0,
		tax: 0,
		total: 0,
	},
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
				type: '[Cart] - LoadCart from cookies',
				payload: getCookieProducts,
			});
		} catch (error) {
			dispatch({
				type: '[Cart] - LoadCart from cookies',
				payload: [],
			});
		}
	}, []);

	useEffect(() => {
		if (state.cart.length > 0) Cookie.set('cart', JSON.stringify(state.cart));
	}, [state.cart]);

	useEffect(() => {
		const numberOfItems = state.cart.reduce(
			(prev, current) => current.quantity + prev,
			0
		);

		const subTotal = state.cart.reduce(
			(prev, current) => current.price * current.quantity + prev,
			0
		);

		const taxRateEnv = process.env.NEXT_PUBLIC_TAX_RATE;
		if (typeof taxRateEnv === 'undefined' || isNaN(Number(taxRateEnv))) {
			throw new Error(
				'The NEXT_PUBLIC_TAX_RATE environment variable is not set or is not a valid number.'
			);
		}
		const taxRate = Number(taxRateEnv);

		const orderSumary = {
			numberOfItems,
			subTotal,
			tax: subTotal * taxRate,
			total: subTotal * (taxRate + 1),
		};

		dispatch({ type: '[Cart] - Update order summary', payload: orderSumary });
	}, [state.cart]);

	const addProductToCart = (product: ICartProduct) => {
		const existProductInCart = state.cart.some(p => p._id === product._id);
		if (!existProductInCart)
			return dispatch({
				type: '[Cart] - Update products',
				payload: [...state.cart, product],
			});

		const productInCartDiffSize = state.cart.some(
			p => p._id === product._id && p.size === product.size
		);
		if (!productInCartDiffSize)
			return dispatch({
				type: '[Cart] - Update products',
				payload: [...state.cart, product],
			});

		const updatedProduct = state.cart.map(p => {
			if (p._id !== product._id) return p;
			if (p.size !== product.size) return p;

			p.quantity += product.quantity;

			return p;
		});

		dispatch({
			type: '[Cart] - Update products',
			payload: updatedProduct,
		});
	};

	const updateCartQuantity = (product: ICartProduct) => {
		dispatch({ type: '[Cart] - Update quantity', payload: product });
	};

	const removeCartProduct = (product: ICartProduct) => {
		dispatch({ type: '[Cart] - Remove product', payload: product });
	};

	return (
		<CartContext.Provider
			value={{
				...state,
				addProductToCart,
				removeCartProduct,
				updateCartQuantity,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};
