import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Context } from '../main.jsx';
import { Pagination } from 'react-bootstrap';

const Pages = observer(() => {
	const { device } = useContext(Context);
	const pagesCount = Math.ceil(device.totalCount / device.limit);

	const pages = [];
	for (let i = 0; i < pagesCount; i++) {
		pages.push(i + 1);
	}

	return (
		<Pagination className={'mt-3'}>
			{pages.map((p, i) => (
				<Pagination.Item
					key={i}
					active={device.page === p}
					onClick={() => device.setPage(p)}
				>
					{p}
				</Pagination.Item>
			))}
		</Pagination>
	);
});

export default Pages;