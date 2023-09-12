import jwt from 'jsonwebtoken';
import ApiError from '../errors/api.error.js';

export const checkRoleMiddleware = (role) => (req, res, next) => {
	if (role !== req.user.role) {
		return next(ApiError.forbidden('Forbidden'));
	}

	next();
}