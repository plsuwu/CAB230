import { Outlet } from 'react-router-dom';
import { NavBar, Footer } from '@/components/navigation';
import { fetchFromApi, useStore } from '@/lib';

// export const countriesLoader = async (): Promise<any> => {
    // const { data, isLoading, setIsLoading, add } = useStore();
    // // const countries: string[] = await fetchFromApi('/countries');
    //
    // const fetchCountries = async () => {
    //     if (!data['countries'] && !isLoading) {
    //         setIsLoading(true);
    //         try {
    //             const countryList = await fetchFromApi('/countries');
    //         } catch (err) {
    //             console.error('issue with country fetch => ', err);
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     }



    // }
    //
    // return { countries };
// };

export default function Root() {
    return (
        <div className='flex h-screen flex-col'>
            <div className='flex flex-1 flex-col'>
                <NavBar />
            </div>
            <div className='min-h-full flex-1'>
                <Outlet />
            </div>
            <div className='flex-0 flex flex-col'>
                <Footer />
            </div>
        </div>
    );
}
