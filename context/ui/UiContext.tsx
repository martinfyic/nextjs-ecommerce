import { Context, createContext } from 'react';

interface ContextProps {
	isMenuOpen: boolean;
	toggleSideMenu: () => void;
}

export const UiContext: Context<ContextProps> = createContext(
	{} as ContextProps
);
