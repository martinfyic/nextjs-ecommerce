import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { IOrder } from '@/interfaces';
import { db } from '@/database';
import { Order, Product } from '@/models';

type Data = { message: string } | IOrder;

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	switch (req.method) {
		case 'POST':
			return createOrder(req, res);

		default:
			return res.status(400).json({
				message: 'Bad request',
			});
	}
}

const createOrder = async (req: NextApiRequest, res: NextApiResponse) => {
	const { orderItems, order } = req.body as IOrder;
	const { total } = order;

	//Validar que tengamos usuario desde la sesion:
	const session: any = await getServerSession(req, res, authOptions);

	if (!session) {
		return res.status(401).json({ message: 'Must be authenticated' });
	}

	//Crear arreglo con los productos seleccionados:
	const productsIds = orderItems.map(prod => prod._id);

	await db.connect();
	const dbProducts = await Product.find({ _id: { $in: productsIds } });

	try {
		const subTotal = orderItems.reduce((prev, current) => {
			const currentPrice = dbProducts.find(
				prod => prod.id === current._id
			)!.price;
			if (!currentPrice) {
				throw new Error('Check cart again, product does not exist');
			}

			return currentPrice * current.quantity + prev;
		}, 0);

		const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);

		const backendTotal = subTotal * (taxRate + 1);

		// Valido que total de front sea igual al del back
		if (total !== backendTotal) {
			throw new Error('The total does not match the amount');
		}

		//Order correcta, paso validacion
		const userId = session.user.id;
		const newOrder = new Order({ ...req.body, isPaid: false, user: userId });
		await newOrder.save();
		await db.disconnect();

		return res.status(201).json(newOrder);
	} catch (error: any) {
		await db.disconnect();
		console.log(error);
		res.status(400).json({ message: error.message || 'Check server logs' });
	}
};
