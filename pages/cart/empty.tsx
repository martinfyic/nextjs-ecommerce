import { NextPage } from 'next';
import NextLink from 'next/link';
import { Box, Link, Typography } from '@mui/material';

import { ShopLayout } from '@/components/layouts';
import { RemoveShoppingCartOutlined } from '@mui/icons-material';

const EmptyPage: NextPage = () => {
	return (
		<ShopLayout
			title='Empty Cart'
			pageDescription='There are no items in the shopping cart'
		>
			<Box
				display='flex'
				justifyContent='center'
				alignItems='center'
				height='calc(100vh - 200px)'
				sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
			>
				<RemoveShoppingCartOutlined sx={{ fontSize: 100 }} />
				<Box
					display='flex'
					flexDirection='column'
					alignItems='center'
				>
					<Typography>Your cart is empty</Typography>
					<Link
						component={NextLink}
						href='/'
						passHref
						typography='h4'
						color='secondary'
					>
						Go back
					</Link>
				</Box>
			</Box>
		</ShopLayout>
	);
};
export default EmptyPage;
