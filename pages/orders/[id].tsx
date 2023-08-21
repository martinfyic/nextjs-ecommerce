import { FC } from 'react';
import NextLink from 'next/link';
import {
	Box,
	Card,
	CardContent,
	Chip,
	Divider,
	Grid,
	Link,
	Typography,
} from '@mui/material';

import { CartList, CartOrderSumary } from '@/components/cart';
import { ShopLayout } from '@/components/layouts';
import {
	CreditCardOffOutlined,
	CreditScoreOutlined,
} from '@mui/icons-material';

const OrderPage: FC = () => {
	return (
		<ShopLayout
			title={`Order Summary 2323123`}
			pageDescription='Order Summary'
		>
			<Typography
				variant='h1'
				component='h1'
			>
				Order Summary: 2323123
			</Typography>

			{/* <Chip
				sx={{ my: 2 }}
				label='Order Unpaid'
				variant='outlined'
				color='error'
				icon={<CreditCardOffOutlined />}
			/> */}
			<Chip
				sx={{ my: 2 }}
				label='Order pay'
				variant='outlined'
				color='success'
				icon={<CreditScoreOutlined />}
			/>

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
								<h2>Pay</h2>
							</Box>

							<Chip
								sx={{ my: 2 }}
								label='Order pay'
								variant='outlined'
								color='success'
								icon={<CreditScoreOutlined />}
							/>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</ShopLayout>
	);
};
export default OrderPage;
