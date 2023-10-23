import { useState, useContext } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import NextLink from 'next/link';

import {
	Box,
	Button,
	Chip,
	Grid,
	Link,
	TextField,
	Typography,
} from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import { useForm } from 'react-hook-form';

import { AuthContext } from '@/context';
import { AuthLayout } from '@/components/layouts';
import { validations } from '@/utils';

type FormData = {
	email: string;
	password: string;
};

const LoginPage: NextPage = () => {
	const router = useRouter();
	const { loginUser } = useContext(AuthContext);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();

	const [showError, setShowError] = useState(false);

	const onLoginUser = async ({ email, password }: FormData) => {
		setShowError(false);

		const isValidLogin = await loginUser(email, password);
		if (!isValidLogin) {
			setShowError(true);
			setTimeout(() => {
				setShowError(false);
			}, 4000);
			return;
		}

		const destination = router.query.p?.toString() || '/';
		router.replace(destination);
	};

	return (
		<AuthLayout
			title='Login'
			pageDescription='User login page'
		>
			<form
				onSubmit={handleSubmit(onLoginUser)}
				noValidate
			>
				<Box sx={{ width: 350, padding: '10px 20px' }}>
					<Grid
						container
						spacing={2}
					>
						<Grid
							item
							xs={12}
							display='flex'
							justifyContent='center'
							flexDirection='column'
						>
							<Typography
								variant='h1'
								component='h1'
								textAlign='center'
							>
								Authenticate
							</Typography>
							<Chip
								label='Username / Password not valid'
								color='error'
								icon={<ErrorOutline />}
								className='fadeIn'
								sx={{ my: 1, display: showError ? 'flex' : 'none' }}
							/>
						</Grid>

						<Grid
							item
							xs={12}
						>
							<TextField
								fullWidth
								label='Email'
								type='email'
								variant='filled'
								{...register('email', {
									required: 'This field is required',
									validate: validations.isEmail,
								})}
								error={!!errors.email}
								helperText={errors.email?.message}
							/>
						</Grid>

						<Grid
							item
							xs={12}
						>
							<TextField
								fullWidth
								label='Password'
								type='password'
								variant='filled'
								{...register('password', {
									required: 'This field is required',
									minLength: { value: 6, message: 'Min 6 characters' },
								})}
								error={!!errors.password}
								helperText={errors.password?.message}
							/>
						</Grid>

						<Grid
							item
							xs={12}
						>
							<Button
								type='submit'
								color='secondary'
								className='circular-btn'
								size='large'
								fullWidth
								disabled={showError}
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
								href={
									router.query.p
										? `/auth/register?p=${router.query.p}`
										: '/auth/register'
								}
								passHref
								underline='always'
							>
								Don&rsquo;t have an account?
							</Link>
						</Grid>
					</Grid>
				</Box>
			</form>
		</AuthLayout>
	);
};
export default LoginPage;
