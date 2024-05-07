import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MdVolcano } from 'react-icons/md';
import PageList from '@/components/navigation/navbar/PageList';
import { pageDefinitions } from '@/components/navigation/pageDefinitions';

export interface Page {
    id: number;
    name: string;
    href: string;
    children?: Page[];
}

const Logo: React.FC<{ title: string }> = ({ title }) => (
    <Link to='/' className='transition-opacity duration-300 hover:opacity-55'>
        <div className='mr-10 flex flex-row flex-wrap items-end justify-center space-x-4 text-3xl font-bold'>
            <MdVolcano className='text-5xl text-vol-orange' />
            <span>{title}</span>
        </div>
    </Link>
);

const Navigation: React.FC = (): React.ReactElement => {

    // these get drilled down into like 3 components lol
    const [open, setOpen] = useState<string>('');
    const deepRef = useRef<HTMLLIElement>(null);
    const appTitle = "VolcanoDB";

    // useRef to close the dropdown if a click is detected on a non-dropdown
    // portion of the DOM while the dropdown is open
    const clickOutside = (event: MouseEvent) => {
        if (deepRef.current && !deepRef.current.contains(event.target as Node)) {
            setOpen('');
        }
    };

    // lifetime hook to attach/cleanup listener to the document to listen
    // for all DOM clicks
    useEffect(() => {
        document.addEventListener('click', clickOutside);
        return () => {
            document.removeEventListener('click', clickOutside);
        };
    }, []);

    // toggle open/closed state of a dropdown
    const toggleDropdown = (identifier: string) => {
        setOpen(open === identifier ? '' : identifier);
    };

    return (
        <>
            <div className='w-full bg-vol-mantle shadow-lg'>
                <div className='flex w-max flex-col space-y-2 px-7 py-6'>
                    <Logo title={appTitle} />
                    <PageList
                        ref={deepRef}
                        pages={pageDefinitions}
                        open={open}
                        toggleDropdown={toggleDropdown}
                    />
                </div>
                <div>

                </div>
            </div>
        </>
    );
};

export default Navigation;
