import jwt from 'jsonwebtoken';

export const generateJwt = (id, email, role) => {
	return jwt.sign(
		{ id, email, role },
		process.env.JWT_SECRET,
		{ expiresIn: '24h' },
	);
}