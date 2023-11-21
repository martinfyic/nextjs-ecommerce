import { IShippingAddress, ISize, IUser } from './';

export interface IOrder {
	_id?: string;
	user?: IUser | string;
	orderItems: IOrderItems[];
	shippingAddress: IShippingAddress;
	paymentResult?: string;
	order: IOrderSummary;
	isPaid: boolean;
	paidAt?: string;
}

export interface IOrderItems {
	_id: string;
	title: string;
	size: ISize;
	quantity: number;
	slug: string;
	image: string;
	price: number;
	gender: string;
}

export interface IOrderSummary {
	numberOfItems: number;
	subTotal: number;
	tax: number;
	total: number;
}
