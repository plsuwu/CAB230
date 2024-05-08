import { Outlet } from 'react-router-dom';
import NavigationD from '@/components/navigation/navbar/NavBar';
import { fetchFromApi } from '@/lib';
import Footer from '@/components/navigation/Footer';

export const countriesLoader = async (): Promise<any> => {
	const countries: string[] = await fetchFromApi('/countries');
	return { countries };
};

export default function Root() {
	return (
			<div className='flex h-screen flex-col'>
				<div className='flex-1 flex flex-col'>
					<NavigationD />
				</div>
				<div className='flex-1 my-12 min-h-full'>
					<Outlet />
				</div>
				<div className='flex flex-0 flex-col'>
				    <Footer />
                </div>
			</div>
	);
}
