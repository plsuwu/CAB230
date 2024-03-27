import { FC, ReactElement, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RiArrowDropUpFill } from 'react-icons/ri';
import { MdVolcano } from 'react-icons/md';
import { classNames } from '../lib/utils';

interface Page {
	id: number;
	name: string;
	href: string;
	children?: Page[];
}

const NavigationD: FC = (): ReactElement => {
	const [dropdownOpen, setDropdownOpen] = useState('');

	// dismisses open dropdown by clicking outside its path
	const handleDismissClickout = (event: MouseEvent) => {
		const path = event.composedPath();
		const isClickInside = path.some((el: EventTarget) =>
			(el as HTMLElement).classList?.contains('dropdown')
		);
		if (dropdownOpen === '' && !isClickInside) {
			setDropdownOpen('');
		}
	};

	// add/remove onclick listener to the dropdown on mount/destroy
	useEffect(() => {
		document.addEventListener('click', handleDismissClickout);
		return () => {
			document.removeEventListener('click', handleDismissClickout);
		};
	}, []); // only run on mount or destroy

	// dropdown toggle handler function
	const handleClickDropdown = (parent: string) => {
		dropdownOpen === parent ? setDropdownOpen('') : setDropdownOpen(parent);
	};

	const pages: Page[] = [
		{ id: 0, name: 'Home', href: '/' },
		{ id: 1, name: 'Volcano List', href: '/volcanoes' },
		{
			id: 2,
			name: 'Account',
			href: '/account',
			children: [
				{ id: 3, name: 'Login', href: '/account/login' },
				{ id: 4, name: 'Register', href: '/account/register' },
			],
		},
	];

	return (
		<>
			<div className='bg-vol-mantle w-full'>
				<div className='flex w-max flex-col space-y-2 px-7 py-6'>
					<Link to='/' className='transition-opacity duration-300 hover:opacity-55'>
						<div className='mr-10 flex flex-row flex-wrap items-end justify-center space-x-4 text-3xl font-bold'>
							<MdVolcano className='text-vol-orange text-5xl' />
							<span>VolcanoDB</span>
						</div>
					</Link>

					<ul
						role='list'
						className='flex w-full flex-row items-center justify-start space-x-7 text-lg font-semibold'
					>
						{pages.map((page) => (
							<li
								key={page.id}
								className='group transition-opacity duration-300 ease-out group-hover:opacity-55'
							>
								{page.children ?
									<button
										className={classNames(
											dropdownOpen === page.name ? 'text-vol-peach dropdown' : '',
											'hover:text-vol-peach active:text-vol-peach transition-color flex space-x-1 duration-300 ease-out'
										)}
										onClick={() => handleClickDropdown(page.name)}
									>
										<span>{page.name}</span>
										<RiArrowDropUpFill
											className={classNames(
												dropdownOpen === page.name ? 'rotate-180' : '',
												'text-3xl transition-transform duration-500 ease-out'
											)}
										/>
									</button>
								:	<Link
										to={page.href}
										className='hover:text-vol-peach transition-color flex space-x-1 duration-300 ease-out'
									>
										<span>{page.name}</span>
									</Link>
								}

								{/* is it possible to fade this on `dropdownOpen` key change? */}
								{dropdownOpen === page.name && page.children ?
									<div className='dropdown bg-vol-crust border-vol-surface absolute mt-2 rounded-lg border bg-opacity-50 py-4 pl-6 pr-20 backdrop-blur-md'>
										{page.children.map((child) => (
											<ul>
												<Link
													to={child.href}
													onClick={() => handleClickDropdown(page.name)}
												>
													<li
														key={child.id}
														className={classNames(
															page.children && child === page.children[0] ?
																''
															:	'mt-2',
															'hover:text-vol-peach transition-color text-base italic duration-300 ease-out'
														)}
													>
														{child.name}
													</li>
												</Link>
											</ul>
										))}
									</div>
								:	<></>}
							</li>
						))}
					</ul>
				</div>
			</div>
		</>
	);
};

export default NavigationD;
