import { FC, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';

import {
	Box,
	Button,
	Card,
	CardContent,
	Divider,
	Grid,
	Typography,
} from '@mui/material';

import { CartContext } from '@/context';
import { CartList, CartOrderSumary } from '@/components/cart';
import { ShopLayout } from '@/components/layouts';

const CartPage: FC = () => {
	const { order, isLoaded, cart } = useContext(CartContext);
	const router = useRouter();

	useEffect(() => {
		if (isLoaded && cart.length === 0) {
			router.replace('/cart/empty');
		}
	}, [isLoaded, cart, router]);

	if (!isLoaded || cart.length === 0) {
		return <></>;
	}

	return (
		<ShopLayout
			title={`Shopping Cart - ${order.numberOfItems} 📦`}
			pageDescription='Store shopping cart'
		>
			<Typography
				variant='h1'
				component='h1'
			>
				Shopping Cart
			</Typography>

			<Grid container>
				<Grid
					item
					xs={12}
					sm={7}
				>
					<CartList editable />
				</Grid>

				<Grid
					item
					xs={12}
					sm={5}
				>
					<Card className='summary-card'>
						<CardContent>
							<Typography
								variant='h2'
								component='h2'
							>
								Order
							</Typography>
							<Divider sx={{ my: 1 }} />

							<CartOrderSumary />

							<Box sx={{ mt: 3 }}>
								<Button
									color='secondary'
									className='circular-btn'
									fullWidth
									href='/checkout/address'
								>
									Checkout
								</Button>
							</Box>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</ShopLayout>
	);
};
export default CartPage;
