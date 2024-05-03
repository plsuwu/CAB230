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

const Logo: React.FC = () => (
    <Link to='/' className='transition-opacity duration-300 hover:opacity-55'>
        <div className='mr-10 flex flex-row flex-wrap items-end justify-center space-x-4 text-3xl font-bold'>
            <MdVolcano className='text-5xl text-vol-orange' />
            <span>VolcanoDB</span>
        </div>
    </Link>
);

const Navigation: React.FC = (): React.ReactElement => {
    const [open, setOpen] = useState<string>('');
    const deepRef = useRef<HTMLLIElement>(null);

    // useRef to close the dropdown if the user clicks on a non-dropdown portion of the DOM
    const clickOutside = (event: MouseEvent) => {
        console.log(deepRef, event.target);
        if (deepRef.current && !deepRef.current.contains(event.target as Node)) {
            setOpen('');
        }
    };

    // lifetime hook - attach/cleanup an event listener to the document to receive clicks from
    // any element
    useEffect(() => {
        document.addEventListener('click', clickOutside);
        return () => {
            document.removeEventListener('click', clickOutside);
        };
    }, []);

    const toggleDropdown = (identifier: string) => {
        setOpen(open === identifier ? '' : identifier);
    };

    return (
        <>
            <div className='w-full bg-vol-mantle shadow-lg'>
                <div className='flex w-max flex-col space-y-2 px-7 py-6'>
                    <Logo />
                    <PageList
                        ref={deepRef}
                        pages={pageDefinitions}
                        open={open}
                        toggleDropdown={toggleDropdown}
                    />
                </div>
            </div>
        </>
    );
};

export default Navigation;
