import { Box, Typography } from '@mui/material';
import { ShopLayout } from '@/components/layouts';

const Page404 = () => {
	return (
		<ShopLayout
			title='Page not found | 404'
			pageDescription='There is nothing to show here'
		>
			<Box
				display='flex'
				justifyContent='center'
				alignItems='center'
				height='calc(100vh - 200px)'
				sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
			>
				<Typography
					variant='h1'
					component='h1'
					fontSize={90}
					fontWeight={200}
				>
					404 |
				</Typography>
				<Typography margin={2}>Page not found</Typography>
			</Box>
		</ShopLayout>
	);
};
export default Page404;
