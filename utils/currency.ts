export const format = (value: number): string => {
	const formatter = new Intl.NumberFormat('es-UY', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(value);

	return formatter;
};
