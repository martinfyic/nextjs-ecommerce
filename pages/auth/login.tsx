import { NextPage } from 'next';
import NextLink from 'next/link';

import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

import { AuthLayout } from '@/components/layouts';

type FormData = {
	email: string;
	password: string;
};

const LoginPage: NextPage = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<FormData>();
	return (
		<AuthLayout
			title='Login'
			pageDescription='User login page'
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
							Authenticate
						</Typography>
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
							Login
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
							href='/auth/register'
							passHref
							underline='always'
						>
							Don&rsquo;t have an account?
						</Link>
					</Grid>
				</Grid>
			</Box>
		</AuthLayout>
	);
};
export default LoginPage;
