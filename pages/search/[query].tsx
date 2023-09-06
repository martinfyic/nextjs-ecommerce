import { GetServerSideProps, NextPage } from 'next';
import { Box, Typography } from '@mui/material';

import { ShopLayout } from '@/components/layouts';
import { ProductList, ProductsSearchNotFound } from '@/components/products';
import { dbProducts } from '@/database';
import { IProduct } from '@/interfaces';

interface Props {
	products: IProduct[];
	foundProducts: boolean;
	query: string;
}

const SearchPage: NextPage<Props> = ({ products, foundProducts, query }) => {
	return (
		<ShopLayout
			title='Search Product'
			pageDescription={'Ecommerce creada con Next JS a modo educativo'}
		>
			<Typography
				variant='h1'
				component='h1'
			>
				Search Product
			</Typography>
			{foundProducts ? (
				<Typography
					variant='h2'
					sx={{ mb: 1 }}
					textTransform='capitalize'
				>
					Term search: {query}
				</Typography>
			) : (
				<ProductsSearchNotFound query={query} />
			)}

			<ProductList products={products} />
		</ShopLayout>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const { query = '' } = params as { query: string };

	if (query.length === 0) {
		return {
			redirect: {
				destination: '/',
				permanent: true,
			},
		};
	}

	let products = await dbProducts.getProductByTerm(query);
	const foundProducts = products.length > 0;

	if (!foundProducts) {
		products = await dbProducts.getAllProducts();
	}

	return {
		props: { products, foundProducts, query },
	};
};

export default SearchPage;
