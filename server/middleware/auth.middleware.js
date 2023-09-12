import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
	try {
		if (req.method === 'OPTIONS') {
			return next();
		}

		const token = req.headers.authorization.split(' ')[1];
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		if (!decoded) {
			return res
				.status(401)
				.json({ message: 'Not Authorized' });
		}

		req.user = decoded;
		next();
	} catch (e) {
		res
			.status(401)
			.json({ message: 'Not Authorized' });
	}
}