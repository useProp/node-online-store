import { Button, Form, Modal } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../main.jsx';
import { createType } from '../http/deviceApi.js';
import { observer } from 'mobx-react-lite';

const CreateType = observer(({ show, onHide }) => {
	const { device } = useContext(Context);
	const [name, setName] = useState('');

	const addType = async () => {
		try {
			const type = await createType(name);
			device.setTypes([...device.types, type]);
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
					Add Type
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
				<Button variant={'outline-success'} onClick={addType}>Add</Button>
				<Button variant={'outline-danger'} onClick={onHide}>Close</Button>
			</Modal.Footer>
		</Modal>
	);
});

export default CreateType;