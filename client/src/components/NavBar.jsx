import { useContext } from 'react';
import { Context } from '../main.jsx';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { ADMIN_PATH, LOGIN_PATH, SHOP_PATH } from '../constants.js';

const NavBar = observer(() => {
	const { user } = useContext(Context);
	const navigate = useNavigate();

	const logout = () => {
		localStorage.removeItem('token');
		user.setIsAuth(false);
		user.setUser({});
		navigate(LOGIN_PATH);
	}

	return (
		<>
			<Navbar bg="dark" data-bs-theme="dark">
				<Container>
					<NavLink
						style={{ color: 'white', textDecoration: 'none' }}
						to={SHOP_PATH}
					>
						Node Online Store
					</NavLink>
					<Nav className="ml-auto">
						{user.isAuth ? (
							<>
								<Button
									className={'me-1'}
									variant={'outline-light'}
									onClick={() => navigate(ADMIN_PATH)}
								>Admin Panel</Button>
								<Button
									onClick={logout}
									variant={'outline-light'}
									>Logout</Button>
							</>
						) : (
							<>
								<Button variant={'outline-light'} onClick={() => navigate(LOGIN_PATH)}>Login</Button>
							</>
						)}
					</Nav>
				</Container>
			</Navbar>
		</>
	);
});

export default NavBar;