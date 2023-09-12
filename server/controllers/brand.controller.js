import { Brand } from '../models/models.js';

class BrandController {
	async create(req, res, next) {
		try {
			const { name } = req.body;
			const brand = await Brand.create({ name });
			res.json(brand);
		} catch (e) {
			next(e);
		}
	}

	async getAll(req, res, next) {
		try {
			const brands = await Brand.findAll();
			res.json(brands);
		} catch (e) {
			next(e);
		}
	}

}

export default new BrandController();