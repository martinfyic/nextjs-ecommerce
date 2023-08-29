import { Box, CircularProgress, Typography } from '@mui/material';

export const FullScreenLoading = () => {
	return (
		<Box
			display='flex'
			flexDirection='column'
			justifyContent='center'
			alignItems='center'
			height='calc(100vh - 200px)'
		>
			<Typography
				variant='h2'
				fontSize={30}
				fontWeight={200}
				marginBottom={3}
			>
				Loading
			</Typography>
			<CircularProgress thickness={2} />
		</Box>
	);
};
