import { Card, Col, Image } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import star from '../assets/star.png';
import { useNavigate } from 'react-router-dom';
import { DEVICE_PATH } from '../constants.js';

const DeviceItem = observer(({ device }) => {
	const navigate = useNavigate();

	return (
		<Col
			md={3}
			className={'mt-3'}
			onClick={() => navigate(`${DEVICE_PATH}/${device.id}`)}
		>
			<Card
				style={{ width: 150, cursor: 'pointer' }}
				border={'light'}
			>
				<Image
					src={`${import.meta.env.VITE_APP_API_URL}/${device.img}`}
					width={150}
					height={150}
				/>
				<div className={'d-flex align-items-center justify-content-between text-black-50'}>
					<div>Samsung</div>
					<div className={'d-flex align-items-center mt-2'}>
						<div>{device.rating}</div>
						<Image
							width={15}
							height={15}
							src={star}
						/>
					</div>
				</div>
				<div>{device.name}</div>
			</Card>
		</Col>
	);
});

export default DeviceItem;