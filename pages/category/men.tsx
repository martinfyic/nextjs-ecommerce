import { NextPage } from 'next';
import { Typography } from '@mui/material';

import { ShopLayout } from '@/components/layouts';
import { ProductList } from '@/components/products';
import { useProducts } from '@/hooks';
import { FullScreenLoading } from '@/components/ui';

const URL = '/api/v1/products?gender=men';

const MenPage: NextPage = () => {
	const { data, error, isLoading } = useProducts(URL);

	if (error) return <div>failed to load</div>;

	return (
		<ShopLayout
			title='Tesla Shop - Mens'
			pageDescription={'Ecommerce creada con Next JS a modo educativo'}
		>
			<Typography
				variant='h1'
				component='h1'
			>
				Mens
			</Typography>
			<Typography
				variant='h2'
				sx={{ mb: 1 }}
			>
				All our products
			</Typography>

			{isLoading ? (
				<FullScreenLoading />
			) : (
				<ProductList products={data.products} />
			)}
		</ShopLayout>
	);
};

export default MenPage;
