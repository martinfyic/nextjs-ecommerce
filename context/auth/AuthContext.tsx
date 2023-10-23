import { Context, createContext } from 'react';

import { IUser } from '@/interfaces';
import { IAuthRegister } from './';

interface ContextProps {
	isLoggedIn: boolean;
	user?: IUser;
	loginUser: (email: string, password: string) => Promise<boolean>;
	registerUser: (
		name: string,
		email: string,
		password: string
	) => Promise<IAuthRegister>;
	logoutUser: () => void;
}

export const AuthContext: Context<ContextProps> = createContext(
	{} as ContextProps
);
