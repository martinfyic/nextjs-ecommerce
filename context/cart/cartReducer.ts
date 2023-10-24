import {
	CartState,
	ICartProduct,
	IOrderSummary,
	IShippingAddress,
} from '@/interfaces';

type CartActionType =
	| {
			type: '[Cart] - LoadCart from cookies';
			payload: ICartProduct[];
	  }
	| {
			type: '[Cart] - LoadAddress from cookies';
			payload: IShippingAddress;
	  }
	| {
			type: '[Cart] - Update address';
			payload: IShippingAddress;
	  }
	| { type: '[Cart] - Update products'; payload: ICartProduct[] }
	| { type: '[Cart] - Update quantity'; payload: ICartProduct }
	| { type: '[Cart] - Remove product'; payload: ICartProduct }
	| { type: '[Cart] - Update order summary'; payload: IOrderSummary };

export const cartReducer = (
	state: CartState,
	action: CartActionType
): CartState => {
	switch (action.type) {
		case '[Cart] - LoadCart from cookies':
			return {
				...state,
				isLoaded: true,
				cart: [...action.payload],
			};

		case '[Cart] - Update products':
			return {
				...state,
				cart: [...action.payload],
			};

		case '[Cart] - Update quantity':
			return {
				...state,
				cart: state.cart.map(prod => {
					if (prod._id !== action.payload._id) return prod;
					if (prod.size !== action.payload.size) return prod;

					return action.payload;
				}),
			};

		case '[Cart] - Remove product':
			return {
				...state,
				cart: state.cart.filter(
					prod =>
						!(
							prod._id === action.payload._id &&
							prod.size === action.payload.size
						)
				),
			};

		case '[Cart] - Update order summary':
			return {
				...state,
				order: { ...action.payload },
			};

		case '[Cart] - LoadAddress from cookies':
		case '[Cart] - Update address':
			return {
				...state,
				shippingAddress: { ...action.payload },
			};

		default:
			return state;
	}
};
