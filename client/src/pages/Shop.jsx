import { Col, Container, Row } from 'react-bootstrap';
import TypeBar from '../components/TypeBar.jsx';
import BrandBar from '../components/BrandBar.jsx';
import DeviceList from '../components/DeviceList.jsx';
import { observer } from 'mobx-react-lite';
import { useContext, useEffect } from 'react';
import { Context } from '../main.jsx';
import { fetchBrands, fetchDevices, fetchTypes } from '../http/deviceApi.js';
import Pages from '../components/Pages.jsx';

const Shop = observer(() => {
	const { device } = useContext(Context);

	useEffect(() => {
		fetchTypes().then((t) => device.setTypes(t));
		fetchBrands().then((b) => device.setBrands(b));
		fetchDevices(null, null, 1, 3).then(({rows, count}) => {
			device.setDevices(rows);
			device.setTotalCount(count);
		});
	}, []);

	useEffect(() => {
		fetchDevices(
			device.selectedBrand.id,
			device.selectedType.id,
			device.page,
			2
		).then(({rows, count}) => {
			device.setDevices(rows);
			device.setTotalCount(count);
		});
	}, [device.page, device.selectedBrand, device.selectedType]);

	return (
		<Container>
			<Row className={'mt-2'}>
				<Col
					md={3}
				>
					<TypeBar />
				</Col>
				<Col
					md={9}
				>
					<BrandBar />
					<DeviceList />
					<Pages />
				</Col>
			</Row>
		</Container>
	);
});

export default Shop;