import { ChangeEvent, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import {
	Box,
	Divider,
	Drawer,
	IconButton,
	Input,
	InputAdornment,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	ListSubheader,
} from '@mui/material';
import {
	AccountCircleOutlined,
	AdminPanelSettings,
	CategoryOutlined,
	ConfirmationNumberOutlined,
	EscalatorWarningOutlined,
	FemaleOutlined,
	LoginOutlined,
	MaleOutlined,
	SearchOutlined,
	VpnKeyOutlined,
} from '@mui/icons-material';

import { UiContext } from '@/context';

export const SideMenu = () => {
	const { isMenuOpen, toggleSideMenu } = useContext(UiContext);
	const [searchTerm, setSearchTerm] = useState('');
	const router = useRouter();

	const navigateTo = (url: string) => {
		router.push(url);
		toggleSideMenu();
	};

	const searcProduct = (
		e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) => {
		setSearchTerm(e.target.value);
	};

	const onSearchTerm = () => {
		if (searchTerm.trim().length === 0) return;
		navigateTo(`/search/${searchTerm}`);
	};

	return (
		<Drawer
			open={isMenuOpen}
			onClose={toggleSideMenu}
			anchor='right'
			sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
		>
			<Box sx={{ width: 250, paddingTop: 5 }}>
				<List>
					<ListItem>
						<Input
							autoFocus
							value={searchTerm}
							onChange={searcProduct}
							onKeyUp={e => e.key === 'Enter' && onSearchTerm()}
							type='text'
							placeholder='Buscar...'
							endAdornment={
								<InputAdornment position='end'>
									<IconButton onClick={onSearchTerm}>
										<SearchOutlined />
									</IconButton>
								</InputAdornment>
							}
						/>
					</ListItem>

					<ListItemButton>
						<ListItemIcon>
							<AccountCircleOutlined />
						</ListItemIcon>
						<ListItemText primary={'Profile'} />
					</ListItemButton>

					<ListItemButton>
						<ListItemIcon>
							<ConfirmationNumberOutlined />
						</ListItemIcon>
						<ListItemText primary={'My Orders'} />
					</ListItemButton>

					<ListItemButton
						sx={{ display: { xs: '', sm: 'none' } }}
						onClick={() => navigateTo('/category/men')}
					>
						<ListItemIcon>
							<MaleOutlined />
						</ListItemIcon>
						<ListItemText primary={'Men'} />
					</ListItemButton>

					<ListItemButton
						sx={{ display: { xs: '', sm: 'none' } }}
						onClick={() => navigateTo('/category/women')}
					>
						<ListItemIcon>
							<FemaleOutlined />
						</ListItemIcon>
						<ListItemText primary={'Women'} />
					</ListItemButton>

					<ListItemButton
						sx={{ display: { xs: '', sm: 'none' } }}
						onClick={() => navigateTo('/category/kid')}
					>
						<ListItemIcon>
							<EscalatorWarningOutlined />
						</ListItemIcon>
						<ListItemText primary={'Kids'} />
					</ListItemButton>

					<ListItemButton>
						<ListItemIcon>
							<VpnKeyOutlined />
						</ListItemIcon>
						<ListItemText primary={'Login'} />
					</ListItemButton>

					<ListItemButton>
						<ListItemIcon>
							<LoginOutlined />
						</ListItemIcon>
						<ListItemText primary={'Logout'} />
					</ListItemButton>

					{/* Admin */}
					<Divider />
					<ListSubheader>Admin Panel</ListSubheader>

					<ListItemButton>
						<ListItemIcon>
							<CategoryOutlined />
						</ListItemIcon>
						<ListItemText primary={'Products'} />
					</ListItemButton>
					<ListItemButton>
						<ListItemIcon>
							<ConfirmationNumberOutlined />
						</ListItemIcon>
						<ListItemText primary={'Orders'} />
					</ListItemButton>

					<ListItemButton>
						<ListItemIcon>
							<AdminPanelSettings />
						</ListItemIcon>
						<ListItemText primary={'Users'} />
					</ListItemButton>
				</List>
			</Box>
		</Drawer>
	);
};
