import { FC, useContext } from 'react';
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

import { CartContext } from '@/context';
import { ICartProduct } from '@/interfaces';
import { ItemCounter } from '../ui';

interface Props {
	editable?: boolean;
}

export const CartList: FC<Props> = ({ editable = false }) => {
	const { cart, updateCartQuantity, removeCartProduct } =
		useContext(CartContext);

	const onNewCartQuantity = (
		product: ICartProduct,
		newQuantityValue: number
	) => {
		product.quantity = newQuantityValue;
		updateCartQuantity(product);
	};

	const onCartRemove = (product: ICartProduct) => {
		removeCartProduct(product);
	};

	return (
		<>
			{cart.map(product => (
				<Grid
					container
					spacing={2}
					key={product.slug + product.size}
					sx={{ my: 1 }}
				>
					<Grid
						item
						xs={3}
					>
						<Link
							component={NextLink}
							href={`/product/${product.slug}`}
							passHref
						>
							<CardActionArea>
								<CardMedia
									image={`/products/${product.image}`}
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
								Size: <strong>{product.size}</strong>
							</Typography>

							{editable ? (
								<ItemCounter
									currentValue={product.quantity}
									updateQuantity={value => onNewCartQuantity(product, value)}
									maxValue={8}
								/>
							) : (
								<Typography
									sx={{ mt: 2 }}
									variant='h5'
								>
									{product.quantity}{' '}
									{product.quantity > 1 ? 'Products' : 'Product'}
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
					>
						<Typography
							variant='subtitle1'
							marginBottom={4}
							marginRight={4}
						>
							${product.price}
						</Typography>
						{/* Editable */}
						{editable && (
							<IconButton onClick={() => onCartRemove(product)}>
								<DeleteOutlineOutlinedIcon titleAccess='Delete product' />
							</IconButton>
						)}
					</Grid>
				</Grid>
			))}
		</>
	);
};
