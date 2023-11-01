// import { type NextRequest, NextResponse } from 'next/server';

// import { jwtVerify } from 'jose';

// export async function middleware(req: NextRequest) {
// 	const previousPage = req.nextUrl.pathname;

// 	if (previousPage.startsWith('/checkout')) {
// 		const token = req.cookies.get('token')?.value || '';

// 		try {
// 			await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
// 			return NextResponse.next();
// 		} catch (error) {
// 			return NextResponse.redirect(
// 				new URL(`/auth/login?p=${previousPage}`, req.url)
// 			);
// 		}
// 	}
// }

// export const config = {
// 	matcher: ['/checkout/address', '/checkout/summary'],
// };

import { type NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
	const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

	if (!session) {
		const requestedPage = req.nextUrl.pathname;
		const url = req.nextUrl.clone();
		url.pathname = `/auth/login`;
		url.search = `p=${requestedPage}`;

		return NextResponse.redirect(url);
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/checkout/address', '/checkout/summary'],
};
