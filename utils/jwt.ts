import jwt from 'jsonwebtoken';

export const singToken = (_id: string, email: string) => {
	if (!process.env.JWT_SECRET) {
		throw new Error('Check environment variables, no JWT seed');
	}

	return jwt.sign({ _id, email }, process.env.JWT_SECRET, { expiresIn: '15d' });
};

export const isValidToken = (token: string): Promise<string> => {
	if (!process.env.JWT_SECRET) {
		throw new Error('Check environment variables, no JWT seed');
	}

	if (token.length <= 10) {
		return Promise.reject('JWT is not valid');
	}

	return new Promise((resolve, reject) => {
		try {
			jwt.verify(token, process.env.JWT_SECRET || '', (error, payload) => {
				if (error) return reject('JWT is not valid');

				const { _id } = payload as { _id: string };
				resolve(_id);
			});
		} catch (error) {
			reject('JWT is not valid');
		}
	});
};
