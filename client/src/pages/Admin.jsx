import { Button, Card, Container } from 'react-bootstrap';
import CreateType from '../modals/CreateType.jsx';
import { useState } from 'react';
import CreateBrand from '../modals/CreateBrand.jsx';
import CreateDevice from '../modals/CreateDevice.jsx';

const Admin = () => {
	const [showTypeModal, setShowTypeModal] = useState(false);
	const [showBrandModal, setShowBrandModal] = useState(false);
	const [showDeviceModal, setShowDeviceModal] = useState(false);

	return (
		<Container
			className={'d-flex align-items-center justify-content-center'}
		>
			<Card
				className={'d-flex align-items-center flex-column justify-content-around w-75 mt-5'}
				style={{ height: 300 }}
			>
				<Button
					variant={'outline-dark'}
					className={'w-75'}
					onClick={() => setShowTypeModal(true)}
				>Add type</Button>
				<Button
					variant={'outline-dark'}
					className={'w-75'}
					onClick={() => setShowBrandModal(true)}
				>Add brand</Button>
				<Button
					variant={'outline-dark'}
					className={'w-75'}
					onClick={() => setShowDeviceModal(true)}
				>Add device</Button>
			</Card>
			<CreateType show={showTypeModal} onHide={() => setShowTypeModal(false)}/>
			<CreateBrand show={showBrandModal} onHide={() => setShowBrandModal(false)}/>
			<CreateDevice show={showDeviceModal} onHide={() => setShowDeviceModal(false)}/>
		</Container>
	);
};

export default Admin;