import { db } from '@/database';
import { IProduct } from '@/interfaces';
import { Product } from '@/models';
import type { NextApiRequest, NextApiResponse } from 'next';

type Response = {
	counts: number;
	products: IProduct[];
};

type Data = { message: string } | Response;

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	switch (req.method) {
		case 'GET':
			return searchProducts(req, res);

		default:
			return res.status(400).json({
				message: `Endpoint [${req.method}] ${req.url} does not exist`,
			});
	}
}

const searchProducts = async (
	req: NextApiRequest,
	res: NextApiResponse<Data>
) => {
	let { q = '' } = req.query;

	if (q.length === 0) {
		return res.status(400).json({
			message: 'You must specify the search query',
		});
	}

	q = q.toString().toLowerCase();

	const query = { $text: { $search: q } };

	await db.connect();
	const products = await Product.find(query)
		.select('title images price inStock slug -_id')
		.lean();
	const counts = await Product.countDocuments(query);
	await db.disconnect();

	return res.status(200).json({ counts, products });
};
