import { FC } from 'react';
import NextLink from 'next/link';
import {
	Box,
	CardActionArea,
	CardMedia,
	Grid,
	IconButton,
	Link,
	Typography,
} from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import { initialData } from '@/database/products';
import { ItemCounter } from '../ui';

// ! Mock Data, delete after develop //
const productsInCart = [
	initialData.products[0],
	initialData.products[1],
	initialData.products[2],
];
// ! ------------------------------ //

interface Props {
	editable?: boolean;
}

export const CartList: FC<Props> = ({ editable = false }) => {
	return (
		<>
			{productsInCart.map(product => (
				<Grid
					container
					spacing={2}
					key={product.slug}
					sx={{ my: 1 }}
				>
					<Grid
						item
						xs={3}
					>
						<Link
							component={NextLink}
							href='/product/slug'
							passHref
						>
							<CardActionArea>
								<CardMedia
									image={`/products/${product.images[0]}`}
									component='img'
									sx={{ borderRadius: '5px' }}
									alt={product.title}
								/>
							</CardActionArea>
						</Link>
					</Grid>
					<Grid
						item
						xs={7}
					>
						<Box
							display='flex'
							flexDirection='column'
						>
							<Typography variant='body1'>{product.title}</Typography>
							<Typography variant='body1'>
								Size: <strong>M</strong>
							</Typography>

							{editable ? (
								<ItemCounter />
							) : (
								<Typography
									sx={{ mt: 2 }}
									variant='h5'
								>
									3 items
								</Typography>
							)}
						</Box>
					</Grid>
					<Grid
						item
						xs={2}
						display='flex'
						alignItems='center'
						flexDirection='column'
						justifyContent='space-between'
					>
						<Typography variant='subtitle1'>${product.price}</Typography>
						{/* Editable */}
						{editable && (
							<IconButton>
								<DeleteOutlineOutlinedIcon titleAccess='Delete product' />
							</IconButton>
						)}
					</Grid>
				</Grid>
			))}
		</>
	);
};
