import { Grid, Typography } from '@mui/material';

export const CartOrderSumary = () => {
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
				<Typography>3</Typography>
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
				<Typography>$155.67</Typography>
			</Grid>

			<Grid
				item
				xs={6}
			>
				<Typography>Taxes IVA 21%</Typography>
			</Grid>
			<Grid
				item
				xs={6}
				display='flex'
				justifyContent='end'
			>
				<Typography>$32.69</Typography>
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
					$188.36
				</Typography>
			</Grid>
		</Grid>
	);
};
