import { FC, ReactNode } from 'react';
import Head from 'next/head';
import { Box } from '@mui/material';

interface Props {
	children?: ReactNode;
	title: string;
	pageDescription: string;
}

export const AuthLayout: FC<Props> = ({ children, title, pageDescription }) => {
	return (
		<>
			<Head>
				<title>{title}</title>
				<meta
					name='description'
					content={pageDescription}
				/>
				<meta
					name='og:title'
					content={title}
				/>
				<meta
					name='og:description'
					content={pageDescription}
				/>
			</Head>
			<main>
				<Box
					display='flex'
					justifyContent='center'
					alignItems='center'
					height='calc(100vh - 200px)'
				>
					{children}
				</Box>
			</main>
		</>
	);
};
