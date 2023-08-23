import { NextPage } from 'next';
import NextLink from 'next/link';
import { Chip, Grid, Link, Typography } from '@mui/material';
import {
	DataGrid,
	GridColDef,
	GridRenderCellParams,
	GridRowsProp,
} from '@mui/x-data-grid';

import { ShopLayout } from '@/components/layouts';

const columns: GridColDef[] = [
	{ field: 'id', headerName: 'ID', width: 100 },
	{ field: 'fullname', headerName: 'Full name', width: 300, sortable: false },
	{
		field: 'paid',
		headerName: 'Paid',
		description: 'Show information if it is paid',
		width: 300,
		sortable: false,
		renderCell: (params: GridRenderCellParams) => {
			return params.row.paid ? (
				<Chip
					color='success'
					label='Paid'
					variant='outlined'
				/>
			) : (
				<Chip
					color='error'
					label='Not paid'
					variant='outlined'
				/>
			);
		},
	},
	{
		field: 'order',
		headerName: 'Order',
		width: 300,
		sortable: false,
		renderCell: (params: GridRenderCellParams) => {
			return (
				<Link
					component={NextLink}
					href={`/orders/${params.row.id}`}
					passHref
					underline='always'
				>
					View Order
				</Link>
			);
		},
	},
];

const rows: GridRowsProp = [
	{ id: 1, paid: false, fullname: 'Martin Ferreira' },
	{ id: 2, paid: true, fullname: 'Jon Doe' },
	{ id: 3, paid: true, fullname: 'Peter Parker' },
	{ id: 4, paid: true, fullname: 'Claudio Bravo' },
	{ id: 5, paid: false, fullname: 'Darwin Nunes' },
	{ id: 6, paid: true, fullname: 'Esteban Vazquez' },
	{ id: 7, paid: false, fullname: 'Rosa Flor' },
	{ id: 8, paid: true, fullname: 'Jhon Weak' },
];

const HistoryPage: NextPage = () => {
	return (
		<ShopLayout
			title='Order History'
			pageDescription='Historial de órdenes del cliente'
		>
			<Typography
				variant='h1'
				component='h1'
			>
				Order History
			</Typography>

			<Grid container>
				<Grid
					item
					xs={12}
					sx={{ height: 650, width: '100%' }}
				>
					<DataGrid
						columns={columns}
						rows={rows}
						initialState={{
							pagination: {
								paginationModel: { pageSize: 5 },
							},
						}}
						pageSizeOptions={[5, 10, 25, 50, 100]}
						autoHeight
					/>
				</Grid>
			</Grid>
		</ShopLayout>
	);
};
export default HistoryPage;
