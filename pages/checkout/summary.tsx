import { FC, useContext, useEffect } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import {
	Box,
	Button,
	Card,
	CardContent,
	Divider,
	Grid,
	Link,
	Typography,
} from '@mui/material';
import Cookies from 'js-cookie';

import { CartContext } from '@/context';
import { CartList, CartOrderSumary } from '@/components/cart';
import { ShopLayout } from '@/components/layouts';
import { countries } from '@/utils';

const SummaryPage: FC = () => {
	const router = useRouter();
	const { shippingAddress } = useContext(CartContext);

	useEffect(() => {
		if (!Cookies.get('firstName')) {
			router.push('/checkout/address');
		}
	}, [router]);

	if (!shippingAddress) return <></>;
	const {
		address,
		address2 = '',
		city,
		country,
		firstName,
		lastName,
		phone,
		zip,
	} = shippingAddress;

	return (
		<ShopLayout
			title='Purchase Summary'
			pageDescription='Purchase Order Summary'
		>
			<Typography
				variant='h1'
				component='h1'
			>
				Purchase
			</Typography>

			<Grid container>
				<Grid
					item
					xs={12}
					sm={7}
				>
					<CartList />
				</Grid>

				<Grid
					item
					xs={12}
					sm={5}
				>
					<Card
						className='summary-card'
						sx={{ mt: { xs: 3 } }}
					>
						<CardContent>
							<Typography
								variant='h2'
								component='h2'
							>
								Purchase Summary
							</Typography>
							<Divider sx={{ my: 1 }} />

							<Box
								display='flex'
								justifyContent='space-between'
							>
								<Typography variant='subtitle1'>Delivery address</Typography>
								<Link
									component={NextLink}
									href='/checkout/address'
									passHref
									underline='hover'
								>
									Edit
								</Link>
							</Box>

							<Typography>
								{firstName} {lastName}
							</Typography>
							<Typography>addr 1: {address}</Typography>
							<Typography>{address2 ? `addr 2: ${address2}` : ''}</Typography>
							<Typography>{city}</Typography>
							<Typography>{zip}</Typography>
							<Typography>
								{countries.find(c => c.code === country)?.name}
							</Typography>
							<Typography>{phone}</Typography>
							<Divider sx={{ my: 1 }} />

							<Box
								display='flex'
								justifyContent='end'
							>
								<Link
									component={NextLink}
									href='/cart'
									passHref
									underline='hover'
								>
									Edit
								</Link>
							</Box>
							<CartOrderSumary />

							<Box sx={{ mt: 3 }}>
								<Button
									color='secondary'
									className='circular-btn'
									fullWidth
								>
									Confirm Order
								</Button>
							</Box>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</ShopLayout>
	);
};
export default SummaryPage;
