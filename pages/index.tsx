import { NextPage } from 'next';
import {
	Card,
	CardActionArea,
	CardMedia,
	Grid,
	Typography,
} from '@mui/material';

import { ShopLayout } from '@/components/layouts';
import { initialData } from '../database/products';

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

			<Grid
				container
				spacing={4}
			>
				{initialData.products.map(product => (
					<Grid
						item
						xs={6}
						sm={4}
						key={product.slug}
					>
						<Card>
							<CardActionArea>
								<CardMedia
									component='img'
									image={`products/${product.images[0]}`}
									alt={product.title}
								/>
							</CardActionArea>
						</Card>
					</Grid>
				))}
			</Grid>
		</ShopLayout>
	);
};

export default HomePage;
