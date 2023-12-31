import { useState, useContext } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { getSession, signIn } from 'next-auth/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

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
	name: string;
	email: string;
	password: string;
};

const RegisterPage: NextPage = () => {
	const router = useRouter();
	const { registerUser } = useContext(AuthContext);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();

	const [showError, setShowError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const onRegisterForm = async ({ email, name, password }: FormData) => {
		setShowError(false);
		const { hasError, message } = await registerUser(name, email, password);
		if (hasError) {
			setShowError(true);
			setErrorMessage(message || '');
			setTimeout(() => {
				setShowError(false);
			}, 4000);
			return;
		}

		//CUSTOM Register
		// const destination = router.query.p?.toString() || '/';
		// router.replace(destination);

		await signIn('credentials', { email, password });
	};

	return (
		<AuthLayout
			title='Register'
			pageDescription='Register user sign up page'
		>
			<form
				onSubmit={handleSubmit(onRegisterForm)}
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
						>
							<Typography
								variant='h1'
								component='h1'
								textAlign='center'
							>
								Register
							</Typography>
							<Chip
								label='Already registered user'
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
								type='text'
								label='Name'
								variant='filled'
								fullWidth
								{...register('name', {
									required: 'This field is required',
									minLength: { value: 2, message: 'Min 2 characters' },
								})}
								error={!!errors.name}
								helperText={errors.name?.message}
							/>
						</Grid>

						<Grid
							item
							xs={12}
						>
							<TextField
								type='email'
								label='Email'
								variant='filled'
								fullWidth
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
								label='Password'
								type='password'
								variant='filled'
								fullWidth
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
								size='large'
								color='secondary'
								className='circular-btn'
								fullWidth
								disabled={showError}
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
								href={
									router.query.p
										? `/auth/login?p=${router.query.p}`
										: '/auth/login'
								}
								passHref
								underline='always'
							>
								Have an account? ?
							</Link>
						</Grid>
					</Grid>
				</Box>
			</form>
		</AuthLayout>
	);
};

export const getServerSideProps: GetServerSideProps = async ({
	req,
	query,
}) => {
	const session = await getSession({ req });
	const { p = '/' } = query;

	if (session) {
		return {
			redirect: {
				destination: p.toString(),
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
};

export default RegisterPage;
