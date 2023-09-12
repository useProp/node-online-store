import { Card, Row } from 'react-bootstrap';
import { useContext } from 'react';
import { Context } from '../main.jsx';
import { observer } from 'mobx-react-lite';

const BrandBar = observer(() => {
	const { device } = useContext(Context);

	return (
		<Row
			className={'d-flex'}
		>
			{device.brands.map(b => (
				<Card
					className={'p-3 w-auto m-1'}
					key={b.id}
					style={{ cursor: 'pointer' }}
					onClick={() => device.setSelectedBrand(b)}
					border={device.selectedBrand.id === b.id ? 'danger' : 'light'}
				>
					{b.name}
				</Card>
			))}
		</Row>
	);
});

export default BrandBar;