import useSWR, { SWRConfiguration } from 'swr';

export const useProducts = (url: string, config: SWRConfiguration = {}) => {
	const { data, error, isLoading } = useSWR(url, config);

	return {
		data,
		error,
		isLoading,
	};
};
