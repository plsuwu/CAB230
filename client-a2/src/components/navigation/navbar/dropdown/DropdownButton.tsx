import { Page } from '@/components/navigation/navbar/NavBar';
import { classNames } from '@/lib';
import { RiArrowDropUpFill } from 'react-icons/ri';

interface DropdownButtonProps {
    open: string;
    page: Page;
    toggleDropdown: (identifier: string) => void;
}

const DropdownButton: React.FC<DropdownButtonProps> = ({ open, page, toggleDropdown }) => {
    return (
        <button
            className={classNames(
                open === page.name ? 'dropdown text-vol-peach' : '',
                'transition-color flex space-x-1 rounded-md duration-300 ease-out hover:text-vol-peach'
            )}
            onClick={() => toggleDropdown(page.name)}
        >
            <span>{page.name}</span>
            <RiArrowDropUpFill
                className={classNames(
                    open === page.name ? 'rotate-180' : '',
                    'text-3xl transition-transform duration-500 ease-out'
                )}
            />
        </button>
    );
};

export default DropdownButton;
