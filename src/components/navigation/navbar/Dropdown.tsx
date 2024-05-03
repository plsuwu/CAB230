import { Link } from 'react-router-dom';
import { classNames } from '@/lib';
import { Page } from '@/components/navigation/navbar/NavBar';

interface DropdownProps {
    children: Page[];
    isOpen: boolean;
    toggleDropdown: (name: string) => void;
    parentName: string;
}

const Dropdown: React.FC<DropdownProps> = ({
    children,
    isOpen,
    toggleDropdown,
    parentName,
}): React.ReactElement => {
    return isOpen ?
        <div className='dropdown absolute min-w-36 rounded-lg border border-vol-surface bg-vol-crust bg-opacity-35 px-2 py-2 backdrop-blur-md'>
            {children.map((child) => (
                <ul key={child.id}>
                    <Link to={child.href} onClick={() => toggleDropdown(parentName)}>
                        <li
                            key={child.name}
                            className={classNames(
                                children && child === children[0] ? '' : 'mt-2',
                                'transition-color w-full rounded-md px-4 py-1 text-sm duration-300 hover:bg-vol-surface hover:text-vol-peach'
                            )}
                        >
                            {child.name}
                        </li>
                    </Link>
                </ul>
            ))}
        </div>
        : <></>;
};

export default Dropdown;
