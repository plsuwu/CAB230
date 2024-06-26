import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MdVolcano } from 'react-icons/md';
import { PageList } from '@/components/navigation';
import { pageDefinitionsLoggedin, pageDefinitionsLoggedOut } from '@/components/navigation/pageDefinitions';
import { parseTokenInfo } from '@/lib/utils/token';

export interface Page {
	id: number;
	name: string;
	href: string;
	children?: Page[];
}

const Logo: React.FC<{ title: string }> = ({ title }) => (
	<Link to='/' className='transition-opacity duration-300 hover:opacity-55'>
		<div className='mr-10 flex flex-row flex-wrap items-end justify-start space-x-4 text-3xl font-bold'>
			<MdVolcano className='text-5xl text-vol-orange' />
			<span>{title}</span>
		</div>
	</Link>
);

const Navigation: React.FC = (): React.ReactElement => {
	const [navPages, setNavPages] = useState(pageDefinitionsLoggedOut);
	const [_, setJwt] = useState('');

	// these get drilled down into like 3 components lol
	const [open, setOpen] = useState<string>('');
	const deepRef = useRef<HTMLLIElement>(null);
	const appTitle = 'VolcanoDB';

	// useRef to close the dropdown if a click is detected on a non-dropdown
	// portion of the DOM while the dropdown is open

	/**
	 * listens for DOM clicks, then checks whether a) the dropdown is open, and b) the DOM element being clicked is the dropdown.
	 * If the dropdown is in an open state and the dropdown's element tree was *not* the target of a click, the element containing the
	 * ref is toggled into a closed state.
	 * @param event - mouse click event
	 */
	const clickOutside = (event: MouseEvent): void => {
		if (deepRef.current && !deepRef.current.contains(event.target as Node)) {
			setOpen('');
		}
	};

	// lifetime hook to attach/cleanup listener to the document to listen
	// for all DOM clicks
	useEffect(() => {
		document.addEventListener('click', clickOutside);
        const readToken = () => {
		    const token = parseTokenInfo();
			if (token && token !== '') {
				setJwt(token);
				setNavPages(pageDefinitionsLoggedin);
			} else {
				setJwt('');
				setNavPages(pageDefinitionsLoggedOut);
			}
		};

        readToken();
		return () => {
			document.removeEventListener('click', clickOutside);
		};
	});

	// toggle open/closed state of a dropdown
	const toggleDropdown = (identifier: string) => {
		setOpen(open === identifier ? '' : identifier);
	};

	return (
		<>
			<div className='my-2 w-[66%] self-center rounded-md bg-vol-mantle shadow-lg'>
				<div className='flex flex-row items-center'>
					<div className='flex w-full flex-col space-y-2 px-7 py-6'>
						<div className='w-max'>
							<Logo title={appTitle} />
						</div>
						<div className='flex w-full flex-row items-center justify-between'>
							<PageList
								ref={deepRef}
								pages={navPages}
								open={open}
								toggleDropdown={toggleDropdown}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Navigation;
