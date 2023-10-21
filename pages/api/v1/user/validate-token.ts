import { db } from '@/database';
import { User } from '@/models';
import { jwt } from '@/utils';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data =
	| { message: string }
	| { message: string; error: unknown }
	| {
			token: string;
			user: {
				email: string;
				name: string;
				role: string;
			};
	  };

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	switch (req.method) {
		case 'GET':
			return checkJWT(req, res);

		default:
			return res.status(400).json({
				message: 'Bad request',
			});
	}
}

const checkJWT = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { token = '' } = req.cookies;

	let userId = '';

	try {
		userId = await jwt.isValidToken(token);
	} catch (error) {
		return res
			.status(401)
			.json({ message: 'Authorization token is not valid', error });
	}

	await db.connect();
	const user = await User.findById(userId).lean();
	await db.disconnect();

	if (!user) {
		return res
			.status(400)
			.json({ message: `There is no user with id: ${userId}` });
	}

	const { _id, email, name, role } = user;

	return res.status(200).json({
		token: jwt.singToken(_id, email),
		user: {
			email,
			name,
			role,
		},
	});
};
