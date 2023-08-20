import NextLink from 'next/link';

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

export const Navbar = () => {
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
						href='/category/man'
						passHref
					>
						<Button>Mens</Button>
					</Link>
					<Link
						component={NextLink}
						href='/category/women'
						passHref
					>
						<Button>Women</Button>
					</Link>
					<Link
						component={NextLink}
						href='/category/kid'
						passHref
					>
						<Button>Kids</Button>
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

					<Button>Menu</Button>
				</Link>
			</Toolbar>
		</AppBar>
	);
};
