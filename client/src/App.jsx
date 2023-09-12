import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter.jsx';
import NavBar from './components/NavBar.jsx';
import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import { Context } from './main.jsx';
import { checkUserLogin } from './http/userApi.js';

const App = observer(() => {
	const [isLoading, setIsLoading] = useState(false);
	const { user } = useContext(Context);

	const checkLogin = async () => {
		try {
			setIsLoading(true);
			const data = await checkUserLogin();
			user.setUser(data)
			user.setIsAuth(true);
		} catch (e) {
			console.log(e);
			user.setIsAuth(false)
		} finally {
			setIsLoading(false);
		}
	}

	useEffect(() => {
		checkLogin();
	}, []);

	return (
		<>
			{!isLoading ?
				(
					<BrowserRouter>
						<NavBar />
						<AppRouter />
					</BrowserRouter>
				) : (
					<h1>Loading</h1>
				)
			}
		</>
	);
});

export default App;