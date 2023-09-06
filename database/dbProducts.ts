import { IProduct } from '@/interfaces';
import { db } from './';
import { Product } from '@/models';

export const getProductBySlug = async (
	slug: string
): Promise<IProduct | null> => {
	await db.connect();
	const product = await Product.findOne({ slug }).lean();
	await db.disconnect();

	if (!product) {
		return null;
	}

	return JSON.parse(JSON.stringify(product));
};

interface ProductSlug {
	slug: string;
}

export const getAllProductSlugs = async (): Promise<ProductSlug[]> => {
	await db.connect();
	const slugs = await Product.find().select('slug -_id').lean();
	await db.disconnect();

	return slugs;
};

export const getProductByTerm = async (
	term: string
): Promise<ProductSlug[]> => {
	term = term.toString().toLowerCase();

	const query = { $text: { $search: term } };

	await db.connect();
	const products = await Product.find(query)
		.select('title images price inStock slug -_id')
		.lean();
	await db.disconnect();

	return JSON.parse(JSON.stringify(products));
};
