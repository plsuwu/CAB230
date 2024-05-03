import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { Page } from '@/components/navigation/navbar/NavBar';
import Dropdown from '@/components/navigation/navbar/Dropdown';
import DropdownButton from '@/components/navigation/navbar/DropdownButton';

interface PageListProps {
    pages: Page[];
    open: string;
    ref: React.ForwardedRef<HTMLLIElement>;
    toggleDropdown: (name: string) => void;
}

interface PageItemProps {
    page: Page;
    open: string;
    ref: React.ForwardedRef<HTMLLIElement>;
    toggleDropdown: (name: string) => void;
}

const PageItem = forwardRef<HTMLLIElement, PageItemProps>((props, ref) => {
    return (
        <li
            key={props.page.id}
            ref={ref}
            className='group transition-opacity duration-300 ease-out group-hover:opacity-55'
        >
            {props.page.children ?
                <>
                <DropdownButton open={props.open} page={props.page} toggleDropdown={props.toggleDropdown} />
                    <Dropdown
                        children={props.page.children}
                        isOpen={props.open === props.page.name}
                        toggleDropdown={props.toggleDropdown}
                        parentName={props.page.name}
                    />
                </>
                : <Link
                    to={props.page.href}
                    className='transition-color flex space-x-1 duration-300 ease-out hover:text-vol-peach'
                >
                    <span>{props.page.name}</span>
                </Link>
            }
        </li>
    );
});

const PageList = forwardRef<HTMLLIElement, PageListProps>((props, ref) => (
    <ul
        role='list'
        className='flex w-full flex-row items-center justify-start space-x-7 text-lg font-semibold'
    >
        {props.pages.map((page) => (
            <div key={page.id}>
                <PageItem page={page} ref={ref} open={props.open} toggleDropdown={props.toggleDropdown} />
            </div>
        ))}
    </ul>
));

export default PageList;
