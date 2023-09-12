import Admin from './pages/Admin.jsx';
import {
	ADMIN_PATH,
	BASKET_PATH,
	DEVICE_PATH,
	LOGIN_PATH,
	NOT_FOUND_PATH,
	REGISTRATION_PATH,
	SHOP_PATH
} from './constants.js';
import Basket from './pages/Basket.jsx';
import Auth from './pages/Auth.jsx';
import DevicePage from './pages/DevicePage.jsx';
import Shop from './pages/Shop.jsx';
import { Navigate } from 'react-router-dom';

export const privateRoutes = [
	{
		path: ADMIN_PATH,
		element: <Admin />
	},
	{
		path: BASKET_PATH,
		element: <Basket />
	},
];

export const publicRoutes = [
	{
		path: LOGIN_PATH,
		element: <Auth />
	},
	{
		path: REGISTRATION_PATH,
		element: <Auth />
	},
	{
		path: DEVICE_PATH + '/:deviceId',
		element: <DevicePage />
	},
	{
		path: SHOP_PATH,
		element: <Shop />
	},
	{
		path: NOT_FOUND_PATH,
		element: <Navigate to={'/'} />
	},
];
