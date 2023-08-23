import { NextPage } from 'next';
import NextLink from 'next/link';
import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';

import { AuthLayout } from '@/components/layouts';

const RegisterPage: NextPage = () => {
	return (
		<AuthLayout
			title='Register'
			pageDescription='Register user sign up page'
		>
			<Box sx={{ width: 350, padding: '10px 20px' }}>
				<Grid
					container
					spacing={2}
				>
					<Grid
						item
						xs={12}
					>
						<Typography
							variant='h1'
							component='h1'
							textAlign='center'
						>
							Register
						</Typography>
					</Grid>

					<Grid
						item
						xs={12}
					>
						<TextField
							label='Full name'
							variant='filled'
							fullWidth
						/>
					</Grid>

					<Grid
						item
						xs={12}
					>
						<TextField
							label='Email'
							variant='filled'
							fullWidth
						/>
					</Grid>

					<Grid
						item
						xs={12}
					>
						<TextField
							label='Password'
							type='password'
							variant='filled'
							fullWidth
						/>
					</Grid>

					<Grid
						item
						xs={12}
					>
						<Button
							color='secondary'
							className='circular-btn'
							fullWidth
						>
							Sign up
						</Button>
					</Grid>

					<Grid
						item
						xs={12}
						display='flex'
						justifyContent='end'
					>
						<Link
							component={NextLink}
							href='/auth/login'
							passHref
							underline='always'
						>
							Have an account? ?
						</Link>
					</Grid>
				</Grid>
			</Box>
		</AuthLayout>
	);
};
export default RegisterPage;
