import { Outlet } from 'react-router-dom';

import NavigationD from '@/components/NavigationD';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function Root() {
	return (
		<>
			<div>
				<NavigationD />
                <Breadcrumbs />
				<Outlet />
                <div className='mb-72'></div>
                {/* footer */}
			</div>
		</>
	);
}
