import path from 'path';
import { fileURLToPath } from 'url';
import { v4 } from 'uuid';
import { Device, DeviceInfo } from '../models/models.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class DeviceController {
	async create(req, res, next) {
		try {
			console.log(req.body)
			let { name, price, typeId, brandId, info } = req.body;
			const { img } = req.files;
			const fileName = v4() + '.jpg';
			await img.mv(path.resolve(__dirname, '..', 'static', fileName));

			const device = await Device.create({
				name,
				price,
				typeId,
				brandId,
				img: fileName,
			});

			if (info) {
				info = JSON.parse(info);
				info.forEach(i => {
					DeviceInfo.create({
						title: i.title,
						description: i.description,
						deviceId: device.id,
					})
				});
			}

			res.json(device);
		} catch (e) {
			console.log(e);
			next(e);
		}
	}

	async getAll(req, res, next) {
		try {
			let { brandId, typeId, limit, page } = req.query;
			page = page || 1;
			limit = limit || 9;
			const offset = page * limit - limit;
			let devices;

			if (!brandId && !typeId) {
				devices = await Device.findAndCountAll({ limit, offset });
			}

			if (brandId && !typeId) {
				devices = await Device.findAndCountAll({ where: { brandId }, limit, offset });
			}

			if (!brandId && typeId) {
				devices = await Device.findAndCountAll({ where: { typeId }, limit, offset });
			}

			if (brandId && typeId) {
				devices = await Device.findAndCountAll({ where: { brandId, typeId }, limit, offset });
			}

			res.json(devices);
		} catch (e) {
			next(e);
		}
	}

	async getOne(req, res, next) {
		try {
			const { id } = req.params;
			const device = await Device.findOne({
				where: {
					id,
				},
				include: [
					{
						model: DeviceInfo,
						as: 'info',
					},
				]
			});
			res.json(device);
		} catch (e) {
			console.log(e)
			next(e);
		}
	}

}

export default new DeviceController();