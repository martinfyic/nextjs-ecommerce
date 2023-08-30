import { FC, useMemo, useState } from 'react';
import NextLink from 'next/link';
import {
	Box,
	Card,
	CardActionArea,
	CardMedia,
	Grid,
	Link,
	Typography,
} from '@mui/material';

import { IProduct } from '@/interfaces';

interface Props {
	prod: IProduct;
}

export const ProductCard: FC<Props> = ({ prod }) => {
	const [isHovered, setIsHovered] = useState(false);
	const [isImageLoaded, setIsImageLoaded] = useState(false);

	const onMouseEnter = () => {
		setIsHovered(true);
	};

	const onMouseLeave = () => {
		setIsHovered(false);
	};

	const productImage = useMemo(() => {
		return isHovered
			? `/products/${prod.images[1]}`
			: `/products/${prod.images[0]}`;
	}, [isHovered, prod.images]);

	return (
		<Grid
			item
			xs={6}
			sm={4}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		>
			<Card>
				<Link
					component={NextLink}
					href='/product/slug'
					passHref
					prefetch={false}
				>
					<CardActionArea>
						<CardMedia
							component='img'
							image={productImage}
							alt={prod.title}
							className='fadeIn'
							onLoad={() => setIsImageLoaded(true)}
						/>
					</CardActionArea>
				</Link>
			</Card>

			<Box
				sx={{ mt: 1, display: isImageLoaded ? 'block' : 'none' }}
				className='fadeIn'
			>
				<Typography fontWeight={700}>{prod.title}</Typography>
				<Typography fontWeight={500}>${prod.price}</Typography>
			</Box>
		</Grid>
	);
};
