import { Row } from 'react-bootstrap';
import { useContext } from 'react';
import { Context } from '../main.jsx';
import DeviceItem from './DeviceItem.jsx';
import { observer } from 'mobx-react-lite';

const DeviceList = observer(() => {
	const { device } = useContext(Context);

	return (
		<Row
			className={'d-flex'}
		>
			{device.devices.map(d => (
				<DeviceItem
					key={d.id}
					device={d}
				/>
			))}
		</Row>
	);
});

export default DeviceList;