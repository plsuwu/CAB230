import { Outlet } from 'react-router-dom';
import { NavBar, Footer } from '@/components/navigation';

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
