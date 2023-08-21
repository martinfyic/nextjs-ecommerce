import { FC } from 'react';
import NextLink from 'next/link';
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

import { CartList, CartOrderSumary } from '@/components/cart';
import { ShopLayout } from '@/components/layouts';

const SummaryPage: FC = () => {
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

							<Typography>Martin Ferreira</Typography>
							<Typography>554 Camino del Vago</Typography>
							<Typography>Montevideo, Centro</Typography>
							<Typography>Uruguay</Typography>
							<Typography>+598 99 756 223</Typography>
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
