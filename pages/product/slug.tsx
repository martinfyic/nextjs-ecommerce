import { NextPage } from 'next';
import { Box, Button, Chip, Grid, Typography } from '@mui/material';

import { ShopLayout } from '@/components/layouts';
import { ProductSizeSelector, ProductSlideshow } from '@/components/products';
import { ItemCounter } from '@/components/ui';

//! Mock data delete after develop //
import { initialData } from '@/database/products';
const product = initialData.products[0];
//! --------------------------------------------//

const ProductPage: NextPage = () => {
	return (
		<ShopLayout
			title={product.title}
			pageDescription={product.description}
		>
			<Grid
				container
				spacing={3}
			>
				<Grid
					item
					xs={12}
					sm={7}
				>
					<ProductSlideshow images={product.images} />
				</Grid>

				<Grid
					item
					xs={12}
					sm={5}
				>
					<Box
						display='flex'
						flexDirection='column'
					>
						{/* titles */}
						<Typography
							variant='h1'
							component='h1'
						>
							{product.title}
						</Typography>
						<Typography
							variant='subtitle1'
							component='h2'
						>
							${product.price}
						</Typography>

						{/* quantity */}
						<Box sx={{ my: 2 }}>
							<Typography variant='subtitle2'>Quantity</Typography>
							<ItemCounter />
							<ProductSizeSelector sizes={product.sizes} />
						</Box>

						{/* add to cart */}
						<Button
							color='secondary'
							className='circular-btn'
						>
							Add to Cart
						</Button>
						{/* <Chip
							label='No available'
							color='error'
							variant='outlined'
						/> */}

						{/* description */}
						<Box sx={{ mt: 3 }}>
							<Typography variant='subtitle2'>Description</Typography>
							<Typography variant='body2'>{product.description}</Typography>
						</Box>
					</Box>
				</Grid>
			</Grid>
		</ShopLayout>
	);
};

export default ProductPage;
