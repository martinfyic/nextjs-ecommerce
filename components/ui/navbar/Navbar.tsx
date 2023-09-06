import { ChangeEvent, useContext, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import {
	AppBar,
	Badge,
	Box,
	Button,
	IconButton,
	Input,
	InputAdornment,
	Link,
	Toolbar,
	Typography,
} from '@mui/material';
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { ClearOutlined } from '@mui/icons-material';

import { UiContext } from '@/context';

export const Navbar = () => {
	const { asPath, push } = useRouter();
	const [searchTerm, setSearchTerm] = useState('');
	const [isSearch, setIsSearch] = useState(false);

	const { toggleSideMenu } = useContext(UiContext);

	const searcProduct = (
		e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) => {
		setSearchTerm(e.target.value);
	};

	const onSearchTerm = () => {
		if (searchTerm.trim().length === 0) return;
		push(`/search/${searchTerm}`);
	};

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

				<Box
					sx={{ display: isSearch ? 'none' : { xs: 'none', sm: 'block' } }}
					className='fadeIn'
				>
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

				{/* Descktop */}
				{isSearch ? (
					<Input
						sx={{ display: { xs: 'none', sm: 'flex' } }}
						className='fadeIn'
						autoFocus
						value={searchTerm}
						onChange={searcProduct}
						onKeyUp={e => e.key === 'Enter' && onSearchTerm()}
						type='text'
						placeholder='Searching...'
						endAdornment={
							<InputAdornment position='end'>
								<IconButton onClick={() => setIsSearch(false)}>
									<ClearOutlined />
								</IconButton>
							</InputAdornment>
						}
					/>
				) : (
					<IconButton
						sx={{ display: { xs: 'none', sm: 'flex' } }}
						onClick={() => setIsSearch(true)}
						className='fadeIn'
					>
						<SearchOutlined />
					</IconButton>
				)}

				{/* Mobile */}
				<IconButton
					sx={{ display: { xs: 'block', sm: 'none' } }}
					onClick={toggleSideMenu}
				>
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
