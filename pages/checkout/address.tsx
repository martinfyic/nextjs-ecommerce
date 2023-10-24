import { useContext } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

import {
	Box,
	Button,
	FormControl,
	Grid,
	MenuItem,
	TextField,
	Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';

import { CartContext } from '@/context';
import { ShopLayout } from '@/components/layouts';
import { countries } from '@/utils';

type FormData = {
	firstName: string;
	lastName: string;
	address: string;
	address2?: string;
	zip: string;
	city: string;
	country: string;
	phone: string;
};

// Leo las cookies fuera de AddressPage para no reprocesar cuando hay cambios en react
const getAddressFromCookies = (): FormData => {
	return {
		firstName: Cookies.get('firstName') || '',
		lastName: Cookies.get('lastName') || '',
		address: Cookies.get('address') || '',
		address2: Cookies.get('address2') || '',
		zip: Cookies.get('zip') || '',
		city: Cookies.get('city') || '',
		country: Cookies.get('country') || '',
		phone: Cookies.get('phone') || '',
	};
};

const AddressPage: NextPage = () => {
	const router = useRouter();
	const { updateAddress } = useContext(CartContext);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		defaultValues: getAddressFromCookies(),
	});

	const onSubmitAdress = (data: FormData) => {
		updateAddress(data);
		router.push('/checkout/summary');
	};

	return (
		<ShopLayout
			title='Checkout Address'
			pageDescription='Confirm delivery address'
		>
			<form
				onSubmit={handleSubmit(onSubmitAdress)}
				noValidate
			>
				<Typography
					variant='h1'
					component='h1'
				>
					Address
				</Typography>

				<Grid
					container
					spacing={2}
					sx={{ mt: 2 }}
				>
					<Grid
						item
						xs={12}
						sm={6}
					>
						<TextField
							type='text'
							label='First Name'
							variant='filled'
							fullWidth
							{...register('firstName', {
								required: 'This field is required',
								minLength: { value: 2, message: 'Min 2 characters' },
							})}
							error={!!errors.firstName}
							helperText={errors.firstName?.message}
						/>
					</Grid>

					<Grid
						item
						xs={12}
						sm={6}
					>
						<TextField
							type='text'
							label='Last Name'
							variant='filled'
							fullWidth
							{...register('lastName', {
								required: 'This field is required',
								minLength: { value: 2, message: 'Min 2 characters' },
							})}
							error={!!errors.lastName}
							helperText={errors.lastName?.message}
						/>
					</Grid>

					<Grid
						item
						xs={12}
						sm={6}
					>
						<TextField
							type='text'
							label='Address'
							variant='filled'
							fullWidth
							{...register('address', {
								required: 'This field is required',
								minLength: { value: 2, message: 'Min 2 characters' },
							})}
							error={!!errors.address}
							helperText={errors.address?.message}
						/>
					</Grid>

					<Grid
						item
						xs={12}
						sm={6}
					>
						<TextField
							type='text'
							label='Address 2 (optional)'
							variant='filled'
							fullWidth
							{...register('address2')}
						/>
					</Grid>

					<Grid
						item
						xs={12}
						sm={6}
					>
						<TextField
							type='text'
							label='Zip Code'
							variant='filled'
							fullWidth
							{...register('zip', {
								required: 'This field is required',
							})}
							error={!!errors.zip}
							helperText={errors.zip?.message}
						/>
					</Grid>

					<Grid
						item
						xs={12}
						sm={6}
					>
						<TextField
							type='text'
							label='City'
							variant='filled'
							fullWidth
							{...register('city', {
								required: 'This field is required',
							})}
							error={!!errors.city}
							helperText={errors.city?.message}
						/>
					</Grid>

					<Grid
						item
						xs={12}
						sm={6}
					>
						<FormControl fullWidth>
							<TextField
								select
								variant='filled'
								label='Country'
								defaultValue={Cookies.get('country') || countries[13].code}
								{...register('country', {
									required: 'This field is required',
								})}
								error={!!errors.country}
							>
								{countries.map(country => (
									<MenuItem
										key={country.code}
										value={country.code}
									>
										{country.name}
									</MenuItem>
								))}
							</TextField>
						</FormControl>
					</Grid>

					<Grid
						item
						xs={12}
						sm={6}
					>
						<TextField
							type='tel'
							label='Phone'
							variant='filled'
							fullWidth
							{...register('phone', {
								required: 'This field is required',
							})}
							error={!!errors.phone}
							helperText={errors.phone?.message}
						/>
					</Grid>
				</Grid>

				<Box
					sx={{ mt: 5 }}
					display='flex'
					justifyContent='center'
				>
					<Button
						type='submit'
						color='secondary'
						className='circular-btn'
						size='large'
					>
						Review Order
					</Button>
				</Box>
			</form>
		</ShopLayout>
	);
};

export default AddressPage;
