import { useContext } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import {
	AppBar,
	Badge,
	Box,
	Button,
	IconButton,
	Link,
	Toolbar,
	Typography,
} from '@mui/material';
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

import { UiContext } from '@/context';

export const Navbar = () => {
	const { asPath } = useRouter();

	const { toggleSideMenu } = useContext(UiContext);

	return (
		<AppBar>
			<Toolbar>
				<Link
					component={NextLink}
					href='/'
					passHref
					display='flex'
					alignItems='center'
				>
					<Typography variant='h6'>Teslo | </Typography>
					<Typography sx={{ ml: 0.5 }}>Shop</Typography>
				</Link>

				<Box flex={1} />

				<Box sx={{ display: { xs: 'none', sm: 'block' } }}>
					<Link
						component={NextLink}
						href='/category/men'
						passHref
					>
						<Button color={asPath === '/category/men' ? 'primary' : 'info'}>
							Mens
						</Button>
					</Link>
					<Link
						component={NextLink}
						href='/category/women'
						passHref
					>
						<Button color={asPath === '/category/women' ? 'primary' : 'info'}>
							Women
						</Button>
					</Link>
					<Link
						component={NextLink}
						href='/category/kid'
						passHref
					>
						<Button color={asPath === '/category/kid' ? 'primary' : 'info'}>
							Kids
						</Button>
					</Link>
				</Box>

				<Box flex={1} />

				<IconButton>
					<SearchOutlined />
				</IconButton>

				<Link
					component={NextLink}
					href='/cart'
					passHref
				>
					<IconButton>
						<Badge
							badgeContent={2}
							color='secondary'
						>
							<ShoppingCartOutlinedIcon />
						</Badge>
					</IconButton>
				</Link>
				<Button onClick={toggleSideMenu}>Menu</Button>
			</Toolbar>
		</AppBar>
	);
};
