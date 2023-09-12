import ApiError from '../errors/api.error.js';
import { Basket, User } from '../models/models.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { generateJwt } from '../utils/generateJwt.js';

class UserController {
	async registration(req, res, next) {
		try {
			console.log(req.body)
			const { email, password, role } = req.body;
			if (!email || !password) {
				throw ApiError.badRequest('Incorrect registration data');
			}

			const candidate = await User.findOne({ where: { email } });
			if (candidate) {
				throw ApiError.badRequest('Email already in use');
			}

			const hashedPassword = await bcrypt.hash(password, 5);

			const user = await User.create({
				email,
				password: hashedPassword,
				role,
			});

			const basket = await Basket.create({
				userId: user.id,
			});

			const token = generateJwt(user.id, user.email, user.role);

			res.json({ token });
		} catch (e) {
			next(e);
		}
	}

	async login(req, res, next) {
		try {
			const { email, password } = req.body;

			const user = await User.findOne({ where: { email } });
			if (!user) {
				throw ApiError.badRequest('Incorrect login data');
			}

			const isPasswordCorrect = bcrypt.compareSync(password, user.password);
			if (!isPasswordCorrect) {
				throw ApiError.badRequest('Incorrect login data');
			}

			const token = generateJwt(user.id, user.email, user.role);

			res.json({ token });
		} catch (e) {
			next(e);
		}
	}

	async check(req, res, next) {
		try {
			const { id, email, role } = req.user;
			const token = generateJwt(id, email, role);
			res.json({ token });
		} catch (e) {
			next(e);
		}
	}
}

export default new UserController();