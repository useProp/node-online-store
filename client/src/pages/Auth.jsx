import { Button, Card, Container, Form, Row } from 'react-bootstrap';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { LOGIN_PATH, REGISTRATION_PATH, SHOP_PATH } from '../constants.js';
import { observer } from 'mobx-react-lite';
import { $host } from '../http/index.js';
import { login, registration } from '../http/userApi.js';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../main.jsx';

const Auth = observer(() => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { user } = useContext(Context);
	const navigate = useNavigate();

	const location = useLocation();
	const isLogin = location.pathname === LOGIN_PATH;

	const auth = async () => {
		try {
			let data;
			if (!isLogin) {
				data = await registration(email, password);
			} else {
				data = await login(email, password);
			}

			user.setUser(data);
			user.setIsAuth(true);
		} catch (e) {
			alert(e.response.data.message || 'error');
		}
	}

	useEffect(() => {
		if (user.isAuth) {
			navigate(SHOP_PATH);
		}
	}, [user.isAuth]);

	return (
		<Container
			className={'d-flex align-items-center justify-content-center'}
			style={{ height: window.innerHeight - 54 }}
		>
			<Card
				className={'p-5'}
				style={{ width: 600 }}
			>
				<h2 className={'m-auto'}>{isLogin ? 'Login' : 'Registration'}</h2>
				<Form
					className={'d-flex flex-column'}
				>
					<Form.Control
						className={'mt-3'}
						placeholder={'Enter email...'}
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>
					<Form.Control
						className={'mt-3'}
						placeholder={'Enter password...'}
						value={password}
						onChange={e => setPassword(e.target.value)}
						type={'password'}
					/>
					<Row
						className={'mt-3 d-flex justify-content-between ps-3 pe-3'}
					>
						<div
							className={'w-25'}
						>
							{isLogin ? (
								<NavLink to={REGISTRATION_PATH}>Join to us!</NavLink>
							) : (
								<NavLink to={LOGIN_PATH}>Login!</NavLink>
							)}
						</div>
						<Button
							className={'w-25'}
							variant={'outline-success'}
							onClick={auth}
						>
							{isLogin ? 'Login' : 'Registration'}
						</Button>
					</Row>
				</Form>
			</Card>
		</Container>
	);
});

export default Auth;