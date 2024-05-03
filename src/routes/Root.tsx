import { Outlet } from 'react-router-dom';

import NavigationD from '@/components/navigation/navbar/NavBar';

export default function Root() {
	return (
		<>
			<div>
				<NavigationD />
				<Outlet />
                <div className='mb-72'></div>
                {/* footer */}
			</div>
		</>
	);
}
