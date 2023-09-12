import { Button, Col, Dropdown, Form, Modal, Row } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../main.jsx';
import { observer } from 'mobx-react-lite';
import { createDevice, fetchBrands, fetchTypes } from '../http/deviceApi.js';

const CreateDevice = observer(({ show, onHide }) => {
	const { device } = useContext(Context);
	const [info, setInfo] = useState([]);
	const [name, setName] = useState('');
	const [price, setPrice] = useState(0);
	const [img, setImg] = useState(null);

	const addDevice = async () => {
		const formData = new FormData();
		formData.append('name', name);
		formData.append('price', `${Number(price)}`);
		formData.append('img', img);
		formData.append('brandId', device.selectedBrand.id);
		formData.append('typeId', device.selectedType.id);
		formData.append('info', JSON.stringify(info));

		try {
			await createDevice(formData);
			onHide();
		} catch (e) {
			console.log(e);
		}
	}

	const addInfo = () => {
		setInfo(prev => [...prev, { title: '', description: '', number: Date.now() }])
	}

	const changeInfo = (key, val, number) => {
		setInfo(prev => prev.map(i => i.number === number ? { ...i, [key]: val } : i));
	}

	const removeInfo = (number) => {
		setInfo(prev => prev.filter(i => i.number !== number))
	}

	useEffect(() => {
		fetchTypes().then((t) => device.setTypes(t));
		fetchBrands().then((b) => device.setBrands(b));
	}, []);

	return (
		<Modal
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
			show={show}
			onHide={onHide}
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Create Device
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Dropdown>
						<Dropdown.Toggle>
							{device.selectedType.name || 'Select type'}
						</Dropdown.Toggle>

						<Dropdown.Menu>
							{device.types.map(t => (
								<Dropdown.Item
									key={t.id}
									onClick={() => device.setSelectedType(t)}
								>
									{t.name}
								</Dropdown.Item>
							))}
						</Dropdown.Menu>
					</Dropdown>

					<Dropdown className={'mt-3'}>
						<Dropdown.Toggle>
							{device.selectedBrand.name || 'Select brand'}
						</Dropdown.Toggle>

						<Dropdown.Menu>
							{device.brands.map(b => (
								<Dropdown.Item
									key={b.id}
									onClick={() => device.setSelectedBrand(b)}
								>
									{b.name}
								</Dropdown.Item>
							))}
						</Dropdown.Menu>
					</Dropdown>

					<Form.Control
						className={'mt-3'}
						name={'name'}
						value={name}
						onChange={e => setName(e.target.value)}
						type={'text'}
						placeholder={'Enter name'}
					/>

					<Form.Control
						className={'mt-3'}
						name={'price'}
						value={price}
						onChange={e => setPrice(e.target.value)}
						placeholder={'Enter price'}
						type={'number'}
					/>

					<Form.Control
						className={'mt-3'}
						placeholder={'Select device image'}
						onChange={e => setImg(e.target.files[0])}
						type={'file'}
					/>

					<hr/>

					<Button
						onClick={addInfo}
						variant={'outline-success'}
					>Add new field</Button>

					{
						info.map(i => (
							<Row key={i.number} className={'mt-3'}>
								<Col md={4}>
									<Form.Control
										placeholder={'Enter title'}
										onChange={e => changeInfo('title', e.target.value, i.number)}
									/>
								</Col>
								<Col md={4}>
									<Form.Control
										placeholder={'Enter description'}
										onChange={e => changeInfo('description', e.target.value, i.number)}
									/>
								</Col>
								<Col md={4}>
									<Button
										variant={'outline-danger'}
										onClick={() => removeInfo(i.number)}
									>Delete</Button>
								</Col>
							</Row>
						))
					}
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant={'outline-success'} onClick={addDevice}>Add</Button>
				<Button variant={'outline-danger'} onClick={onHide}>Close</Button>
			</Modal.Footer>
		</Modal>
	);
});

export default CreateDevice;