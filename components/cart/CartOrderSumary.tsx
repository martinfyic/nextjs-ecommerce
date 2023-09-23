import { useContext } from 'react';

import { Grid, Typography } from '@mui/material';

import { CartContext } from '@/context';
import { currency } from '@/utils';

export const CartOrderSumary = () => {
	const { order } = useContext(CartContext);
	const { numberOfItems, subTotal, tax, total } = order;
	const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100;
	return (
		<Grid
			container
			sx={{ mt: 3 }}
		>
			<Grid
				item
				xs={6}
			>
				<Typography>QTY</Typography>
			</Grid>
			<Grid
				item
				xs={6}
				display='flex'
				justifyContent='end'
			>
				<Typography>{numberOfItems}</Typography>
			</Grid>

			<Grid
				item
				xs={6}
			>
				<Typography>SubTotal</Typography>
			</Grid>
			<Grid
				item
				xs={6}
				display='flex'
				justifyContent='end'
			>
				<Typography>{currency.format(subTotal)}</Typography>
			</Grid>

			<Grid
				item
				xs={6}
			>
				<Typography>Taxes IVA {taxRate}%</Typography>
			</Grid>
			<Grid
				item
				xs={6}
				display='flex'
				justifyContent='end'
			>
				<Typography>{currency.format(tax)}</Typography>
			</Grid>

			<Grid
				item
				xs={6}
			>
				<Typography
					sx={{ mt: 2 }}
					variant='subtitle1'
				>
					Total
				</Typography>
			</Grid>
			<Grid
				item
				xs={6}
				display='flex'
				justifyContent='end'
			>
				<Typography
					sx={{ mt: 2 }}
					variant='subtitle1'
				>
					{currency.format(total)}
				</Typography>
			</Grid>
		</Grid>
	);
};
