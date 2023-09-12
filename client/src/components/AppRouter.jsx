import { Route, Routes } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '../routes.jsx';
import { useContext } from 'react';
import { Context } from '../main.jsx';
import { observer } from 'mobx-react-lite';

const AppRouter = observer(() => {
	const { user } = useContext(Context);

	return (
		<Routes>
			{user.isAuth && privateRoutes.map(({ path, element }, i) => (
				<Route
					key={i}
					path={path}
					element={element}
				/>
			))}
			{publicRoutes.map(({ path, element }, i) => (
				<Route
					key={i}
					path={path}
					element={element}
				/>
			))}
		</Routes>
	);
});

export default AppRouter;