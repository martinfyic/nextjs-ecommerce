import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { SWRConfig } from 'swr';
import { UiProvider } from '@/context';
import { lightTheme } from '@/themes';

function App({ Component, pageProps }: AppProps) {
	return (
		<SWRConfig
			value={{
				fetcher: (resource, init) =>
					fetch(resource, init).then(res => res.json()),
			}}
		>
			<UiProvider>
				<ThemeProvider theme={lightTheme}>
					<CssBaseline />
					<Component {...pageProps} />
				</ThemeProvider>
			</UiProvider>
		</SWRConfig>
	);
}

export default App;
