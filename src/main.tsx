import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { StoreProvider } from '@/lib';
import ReactDOM from 'react-dom/client';
import './index.css';

import Root from '@/routes/Root';
import ErrorPage from '@/routes/ErrorPage';
import RootLanding from '@/routes/Landing/Landing';
import AccountLogin from '@/routes/User/Login';
import AccountRegister from '@/routes/User/Register';
import VolcanoRoot from '@/routes/Volcanoes/VolcanoRoot';
import VolcanoSlug from '@/routes/Volcanoes/VolcanoSlug';
import AccountLogout from '@/routes/User/Logout';
import AccountDetails from '@/routes/User/Account';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		errorElement: <ErrorPage />,
		// loader: countriesLoader,
		children: [
			{
				path: '/',
				element: <RootLanding />,
			},
			{
				path: 'volcanoes',
				element: <VolcanoRoot />,
			},
			{
				path: 'volcanoes/:country',
				element: <VolcanoRoot />,
			},
			{
				path: 'volcanoes/:country/:id',
				element: <VolcanoSlug />,
			},
			{
				path: 'account',
				element: <Outlet />,
				children: [
					{
						path: 'register',
						element: <AccountRegister />,
					},
					{
						path: 'login',
						element: <AccountLogin />,
					},
					{
						path: 'me',
						element: <AccountDetails />,
					},
					{
						path: 'logout',
						element: <AccountLogout />,
					},
				],
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<StoreProvider>
		<RouterProvider router={router} />
	</StoreProvider>
);
