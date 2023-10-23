import { type NextRequest, NextResponse } from 'next/server';

import { jwtVerify } from 'jose';

export async function middleware(req: NextRequest) {
	const previousPage = req.nextUrl.pathname;

	if (previousPage.startsWith('/checkout')) {
		const token = req.cookies.get('token')?.value || '';

		try {
			await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
			return NextResponse.next();
		} catch (error) {
			return NextResponse.redirect(
				new URL(`/auth/login?p=${previousPage}`, req.url)
			);
		}
	}
}

export const config = {
	matcher: ['/checkout/:path*'],
};
