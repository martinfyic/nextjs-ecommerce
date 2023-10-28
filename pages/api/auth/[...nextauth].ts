import NextAuth, { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
	// Configure one or more authentication providers
	providers: [
		Credentials({
			name: 'Email',
			credentials: {
				email: {
					label: 'Email',
					type: 'email',
					placeholder: 'correo@corro.com',
				},
				password: {
					label: 'Password',
					type: 'password',
					placeholder: 'Password',
				},
			},
			async authorize(credentials) {
				console.log(credentials);
				return null;
			},
		}),
		GithubProvider({
			clientId: process.env.GITHUB_ID || '',
			clientSecret: process.env.GITHUB_SECRET || '',
		}),
	],

	callbacks: {
		async jwt({ account, token, user }) {
			if (account) {
				token.accessToken = account.access_token;

				switch (account.type) {
					case 'oauth':
						break;
					case 'credentials':
						token.user = user;
						break;

					default:
						break;
				}
			}

			return token;
		},

		async session({ session, token, user }) {
			session.accessToken = token.accessToken as any;
			session.user = token.user as any;
			return session;
		},
	},
};

export default NextAuth(authOptions);
