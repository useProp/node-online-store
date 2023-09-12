import ApiError from '../errors/api.error.js';

const errorMiddleware = (err, req, res, next) => {
	if (err instanceof ApiError) {
		return res
			.status(err.status)
			.json({ message: err.message });
	}

	return res
		.status(500)
		.json({ message: 'Internal error' });
}

export default errorMiddleware;