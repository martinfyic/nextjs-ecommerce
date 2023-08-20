import { NextPage } from 'next';
import { Typography } from '@mui/material';

import { ShopLayout } from '@/components/layouts';

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
				Start Proyect 🚀
			</Typography>
			<Typography
				variant='h2'
				sx={{ mb: 1 }}
			>
				Ecommerce Next Js
			</Typography>
		</ShopLayout>
	);
};

export default HomePage;
