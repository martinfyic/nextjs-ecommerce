import { FC, ReactNode, useReducer, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import Cookies from 'js-cookie';
import axios from 'axios';

import { AuthContext, authReducer } from './';
import { IUser } from '@/interfaces';
import { ecommerApi } from '@/api';

export interface AuthState {
	isLoggedIn: boolean;
	user?: IUser;
}

export interface IAuthRegister {
	hasError: boolean;
	message?: string;
}

const AUTH_INITIAL_STATE: AuthState = {
	isLoggedIn: false,
	user: undefined,
};

interface Props {
	children?: ReactNode;
}

export const AuthProvider: FC<Props> = ({ children }) => {
	const { data, status } = useSession();
	const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
	const router = useRouter();

	useEffect(() => {
		if (status === 'authenticated') {
			// TODO: dispatch({type: '[Auth] - Login', payload: data.user as IUser})
			console.log({ user: data.user });
		}
	}, [status, data?.user]);

	// Custom Auth
	// useEffect(() => {
	// 	checkToken();
	// }, []);

	// const checkToken = async () => {
	// 	if (!Cookies.get('token')) return;

	// 	try {
	// 		const { data } = await ecommerApi.get('/user/validate-token');
	// 		const { token, user } = data;
	// 		Cookies.set('token', token);
	// 		dispatch({ type: '[Auth] - Login', payload: user });
	// 	} catch (error) {
	// 		Cookies.remove('token');
	// 	}
	// };

	const loginUser = async (
		email: string,
		password: string
	): Promise<boolean> => {
		try {
			const { data } = await ecommerApi.post('/user/login', {
				email,
				password,
			});
			const { token, user } = data;
			Cookies.set('token', token);
			dispatch({ type: '[Auth] - Login', payload: user });
			return true;
		} catch (error) {
			return false;
		}
	};

	const registerUser = async (
		name: string,
		email: string,
		password: string
	): Promise<IAuthRegister> => {
		try {
			const { data } = await ecommerApi.post('/user/register', {
				name,
				password,
				email,
			});
			const { token, user } = data;
			Cookies.set('token', token);
			dispatch({ type: '[Auth] - Login', payload: user });
			return {
				hasError: false,
			};
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return {
					hasError: true,
					message: error.response?.data.message,
				};
			}
			return {
				hasError: true,
				message: 'Could not create user, try again later',
			};
		}
	};

	const logoutUser = () => {
		Cookies.remove('token');
		Cookies.remove('cart');
		Cookies.remove('firstName');
		Cookies.remove('lastName');
		Cookies.remove('address');
		Cookies.remove('address2');
		Cookies.remove('zip');
		Cookies.remove('city');
		Cookies.remove('country');
		Cookies.remove('phone');
		router.reload();
	};

	return (
		<AuthContext.Provider
			value={{ ...state, loginUser, registerUser, logoutUser }}
		>
			{children}
		</AuthContext.Provider>
	);
};
