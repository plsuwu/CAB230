import { Outlet, useLoaderData } from 'react-router-dom';
import NavigationD from '@/components/navigation/navbar/NavBar';
import { fetchFromApi } from '@/lib';
import { useStore } from '@/lib';

export const countriesLoader = async (): Promise<any> => {
    const countries: string[] = await fetchFromApi('/countries');
    return { countries };
};

export default function Root() {
    const { data, add } = useStore();
    const { countries } = useLoaderData();


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
