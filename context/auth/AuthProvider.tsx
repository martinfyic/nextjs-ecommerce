import { FC, ReactNode, useReducer, useEffect } from 'react';

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
	const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

	useEffect(() => {
		checkToken();
	}, []);

	const checkToken = async () => {
		try {
			const { data } = await ecommerApi.get('/user/validate-token');
			const { token, user } = data;
			Cookies.set('token', token);
			dispatch({ type: '[Auth] - Login', payload: user });
		} catch (error) {
			Cookies.remove('token');
		}
	};

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

	return (
		<AuthContext.Provider value={{ ...state, loginUser, registerUser }}>
			{children}
		</AuthContext.Provider>
	);
};