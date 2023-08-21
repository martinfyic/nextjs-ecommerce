import { NextPage } from 'next';
import { Typography } from '@mui/material';

import { ShopLayout } from '@/components/layouts';
import { initialData } from '../database/products';
import { ProductList } from '@/components/products';

const HomePage: NextPage = () => {
	return (
		<ShopLayout
			title='Ecommerce NextJS'
			pageDescription={'Ecommerce creada con Next JS a modo educativo'}
		>
			<Typography
				variant='h1'
				component='h1'
			>
				Store
			</Typography>
			<Typography
				variant='h2'
				sx={{ mb: 1 }}
			>
				All our products
			</Typography>

			<ProductList products={initialData.products as any} />
		</ShopLayout>
	);
};

export default HomePage;
