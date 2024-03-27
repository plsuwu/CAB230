import { Outlet } from 'react-router-dom';

import NavigationD from '../components/NavigationD';

export default function Root() {
	return (
		<>
			<div>
				<NavigationD />
				<Outlet />
			</div>
		</>
	);
}
