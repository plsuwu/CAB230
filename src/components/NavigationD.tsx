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

	// dismiss open dropdown by clicking other section of the screen
	const handleDismissClickout = (event: MouseEvent) => {
		const path = event.composedPath();
		const isClickInside = path.some((el: EventTarget) =>
			(el as HTMLElement).classList?.contains('dropdown')
		);
		if (dropdownOpen === '' && !isClickInside) {
			setDropdownOpen('');
		}
	};

	// add/remove onclick listener to the dropdown on component mount/destroy
	useEffect(() => {
		document.addEventListener('click', handleDismissClickout);
		return () => {
			document.removeEventListener('click', handleDismissClickout);
		};
	}, []); // only run this hook on mount/destroy

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
			<div className='w-full bg-vol-mantle'>
				<div className='flex w-max flex-col space-y-2 px-7 py-6'>
					<Link to='/' className='transition-opacity duration-300 hover:opacity-55'>
						<div className='mr-10 flex flex-row flex-wrap items-end justify-center space-x-4 text-3xl font-bold'>
							<MdVolcano className='text-5xl text-vol-orange' />
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
											dropdownOpen === page.name ? 'dropdown text-vol-peach' : '',
											'transition-color flex space-x-1 rounded-md duration-300 ease-out hover:text-vol-peach'
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
										className='transition-color flex space-x-1 duration-300 ease-out hover:text-vol-peach'
									>
										<span>{page.name}</span>
									</Link>
								}

								{/* -> fade this on in/out `dropdownOpen` key change
                                        -   can either use HeadlessUI or find a way to do this without a package (prefer 2nd opt)
                                    -> set up state handling to display `account info` && `log out` if a user is signed in
                                */}
								{dropdownOpen === page.name && page.children ?
									<div className='dropdown absolute min-w-36 rounded-lg border border-vol-surface bg-vol-crust bg-opacity-35 px-2 py-2 backdrop-blur-md'>
										{page.children.map((child) => (
											<ul key={child.id}>
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
															'transition-color w-full rounded-md px-4 py-1 text-sm duration-300 hover:bg-vol-surface hover:text-vol-peach'
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
