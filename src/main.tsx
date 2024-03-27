import './index.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';

import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

import Root from './routes/Root';
import ErrorPage from './routes/ErrorPage';
import RootLanding from './routes/Landing/Landing';
import AccountLogin from './routes/User/Login';
import AccountRegister from './routes/User/Register';
import VolcanoRoot from './routes/Volcanoes/VolcanoRoot';
import VolcanoSlug from './routes/Volcanoes/VolcanoSlug';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: '/',
				element: <RootLanding />,
			},
			{
				path: '/volcanoes',
				element: <VolcanoRoot />,
				children: [
					{
						path: '/volcanoes/:id',
						element: <VolcanoSlug />,
					},
				],
			},
			{
				path: '/account',
				element: <Outlet />,
				children: [
					{
						path: '/account/register',
						element: <AccountRegister />,
					},
					{
						path: '/account/login',
						element: <AccountLogin />,
					},
				],
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
