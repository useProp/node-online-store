import { $authHost, $host } from './index.js';

export const fetchTypes = async () => {
	const { data } = await $host.get('/api/type');
	return data;
}

export const createType = async (name) => {
	const { data } = await $authHost.post('/api/type', { name });
	return data;
}

export const fetchBrands = async () => {
	const { data } = await $host.get('/api/brand');
	return data;
}

export const createBrand = async (name) => {
	const { data } = await $authHost.post('/api/brand', { name });
	return data;
}

export const fetchDevices = async (brandId, typeId, page, limit = 5) => {
	const { data } = await $host.get('/api/device', {
		params: {
			brandId,
			typeId,
			page,
			limit,
		},
	});
	return data;
}

export const createDevice = async (val) => {
	const { data } = await $authHost.post('/api/device', val);
	return data;
}

export const fetchDevice = async (id) => {
	const { data } = await $authHost.get(`/api/device/${id}`);
	return data;
}