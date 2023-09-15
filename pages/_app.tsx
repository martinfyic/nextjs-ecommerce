import '@/styles/globals.css';
import type { AppProps } from 'next/app';

import { ThemeProvider, CssBaseline } from '@mui/material';
import { SWRConfig } from 'swr';

import { CartProvider, UiProvider } from '@/context';
import { lightTheme } from '@/themes';

function App({ Component, pageProps }: AppProps) {
	return (
		<SWRConfig
			value={{
				fetcher: (resource, init) =>
					fetch(resource, init).then(res => res.json()),
			}}
		>
			<CartProvider>
				<UiProvider>
					<ThemeProvider theme={lightTheme}>
						<CssBaseline />
						<Component {...pageProps} />
					</ThemeProvider>
				</UiProvider>
			</CartProvider>
		</SWRConfig>
	);
}

export default App;
