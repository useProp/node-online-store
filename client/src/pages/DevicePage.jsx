import { Col, Container, Row, Image, Card, Button } from 'react-bootstrap';
import bigStar from '../assets/big-star.png'
import { useEffect, useState } from 'react';
import { fetchDevice } from '../http/deviceApi.js';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

const DevicePage = observer(() => {
	const [device, setDevice] = useState({ info: [] });
	const { deviceId } = useParams();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		fetchDevice(deviceId)
			.then(d => setDevice(d))
			.finally(() => setIsLoading(false));
	}, [])

	if (isLoading) {
		return (
			<h1>Is Loading...</h1>
		)
	}

	return (
		<Container
			className={'mt-3'}
		>
			<Row>
				<Col md={4}>
					<Image
						width={300}
						height={300}
						src={`${import.meta.env.VITE_APP_API_URL}/${device.img}`}
					/>
				</Col>
				<Col md={4}>
					<Row className={'d-flex align-items-center justify-content-center flex-column'}>
						<h2
							style={{ textAlign: 'center' }}
						>{device.name}</h2>
						<div
							className={'d-flex justify-content-center align-items-center'}
							style={{ background: `url(${bigStar}) no-repeat center center`, width: 240, height: 240, backgroundSize: 'cover', fontSize: 64 }}
						>
							{device.rating || 0}
						</div>
					</Row>
				</Col>
				<Col md={4}>
					<Card
						className={'d-flex flex-column align-items-center justify-content-around'}
						style={{ fontSize: 32, width: 300, height: 300 }}
					>
						<h3>{device.price}</h3>
						<Button variant={'outline-dark'}>Add to basket</Button>
					</Card>
				</Col>
			</Row>
			<Row className={'d-flex flex-column m-3'}>
				<h1>Specifications</h1>
				{device.info.map((d, i) => (
					<Row
						key={d.id}
						style={{ background: i % 2 === 0 ? 'lightgray' : 'transparent', padding: 10 }}
					>
						{d.title}: {d.description}
					</Row>
				))}
			</Row>
		</Container>
	);
});

export default DevicePage;