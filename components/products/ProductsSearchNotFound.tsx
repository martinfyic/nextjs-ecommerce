import { FC } from 'react';
import { Box, Typography } from '@mui/material';

interface Prop {
	query: string;
}

export const ProductsSearchNotFound: FC<Prop> = ({ query }) => {
	return (
		<Box display='flex'>
			<Typography
				variant='h2'
				sx={{ mb: 1 }}
			>
				No products found with
			</Typography>
			<Typography
				variant='h2'
				sx={{ ml: 1 }}
				color='secondary'
			>
				{query}
			</Typography>
		</Box>
	);
};
