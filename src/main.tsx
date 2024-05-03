import ReactDOM from 'react-dom/client';
import './index.css';
import { StoreProvider } from '@/lib/index';

import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Root from '@/routes/Root';
import ErrorPage from '@/routes/ErrorPage';
import RootLanding from '@/routes/Landing/Landing';
import AccountLogin from '@/routes/User/Login';
import AccountRegister from '@/routes/User/Register';
import VolcanoRoot from '@/routes/Volcanoes/VolcanoRoot';
import VolcanoSlug from '@/routes/Volcanoes/VolcanoSlug';

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
	// <React.StrictMode>
		<StoreProvider>
			<RouterProvider router={router} />
		</StoreProvider>
	// </React.StrictMode>
);
