import type { NextApiRequest, NextApiResponse } from 'next';

import bcrypt from 'bcryptjs';

import { db } from '@/database';
import { User } from '@/models';
import { jwt, validations } from '@/utils';

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
		case 'POST':
			return registerUser(req, res);

		default:
			return res.status(400).json({
				message: 'Bad request',
			});
	}
}

const registerUser = async (
	req: NextApiRequest,
	res: NextApiResponse<Data>
) => {
	const { name, email, password } = req.body as {
		name: string;
		email: string;
		password: string;
	};

	if (password.length < 6) {
		return res.status(400).json({
			message: 'The password must be greater than or equal to 6 characters',
		});
	}

	if (name.length < 2) {
		return res.status(400).json({
			message: 'The name must not be less than 2 characters',
		});
	}

	if (!validations.isValidEmail(email)) {
		return res.status(400).json({
			message: `The email ${email} does not appear to be valid`,
		});
	}

	await db.connect();
	const user = await User.findOne({ email });

	if (user) {
		await db.disconnect();
		return res
			.status(400)
			.json({ message: `The email ${email} is already registered` });
	}

	const newUser = new User({
		email: email.toLocaleLowerCase(),
		password: bcrypt.hashSync(password),
		role: 'CLIENT',
		name,
	});

	try {
		await newUser.save({ validateBeforeSave: true });
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ message: 'Review server logs, Internal error', error });
	} finally {
		await db.disconnect();
	}

	const { _id, role } = newUser;

	const token = jwt.singToken(_id, email);

	return res.status(200).json({
		token,
		user: {
			email,
			role,
			name,
		},
	});
};
