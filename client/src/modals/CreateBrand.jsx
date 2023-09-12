import { Button, Form, Modal } from 'react-bootstrap';
import { createBrand } from '../http/deviceApi.js';
import { observer } from 'mobx-react-lite';
import { useContext, useState } from 'react';
import { Context } from '../main.jsx';

const CreateBrand = observer(({ show, onHide }) => {
	const { device } = useContext(Context);
	const [name, setName] = useState('');

	const addBrand = async () => {
		try {
			const brand = await createBrand(name);
			device.setBrands([...device.brands, brand]);
			onHide();
		} catch (e) {
			console.log(e);
		}
	}

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
					Add Brand
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Control
						placeholder={'Enter Type Name...'}
						value={name}
						onChange={e => setName(e.target.value)}
					/>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant={'outline-success'} onClick={addBrand}>Add</Button>
				<Button variant={'outline-danger'} onClick={onHide}>Close</Button>
			</Modal.Footer>
		</Modal>
	);
});

export default CreateBrand;