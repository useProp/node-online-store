import { useContext } from 'react';
import { Context } from '../main.jsx';
import { ListGroup } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

const TypeBar = observer(() => {
	const { device } = useContext(Context);

	return (
		<ListGroup>
			{device.types.map(t => (
			<ListGroup.Item
				style={{ cursor: 'pointer' }}
				onClick={() => device.setSelectedType(t)}
				active={t.id === device.selectedType.id}
				key={t.id}
			>
				{t.name}
			</ListGroup.Item>
			))}
		</ListGroup>
	);
});

export default TypeBar;