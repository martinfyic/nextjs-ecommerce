import type { NextApiRequest, NextApiResponse } from 'next';
import { db, SHOP_CONSTANTS } from '@/database';
import { Product } from '@/models';
import { IProduct } from '@/interfaces';

type Response = {
	counts: number;
	products: IProduct[];
};

type Data =
	| {
			message: string;
	  }
	| Response;

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	switch (req.method) {
		case 'GET':
			return getProducts(req, res);

		default:
			return res.status(400).json({
				message: `Endpoint [${req.method}] ${req.url} does not exist`,
			});
	}
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { gender = 'all' } = req.query;

	let condition = {};

	if (gender !== 'all' && SHOP_CONSTANTS.validGender.includes(`${gender}`)) {
		condition = { gender };
	}

	await db.connect();
	const products = await Product.find(condition)
		.select('title images price inStock slug -_id')
		.lean();
	const counts = await Product.countDocuments(condition);
	await db.disconnect();

	res.status(200).json({ counts, products });
};
