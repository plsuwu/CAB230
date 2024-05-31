import { Disclosure } from '@headlessui/react';
import { IoReturnUpForward } from 'react-icons/io5';

interface AccordionRowProps {
	country: string;
	open: boolean;
	expandCountry: (country: string) => Promise<void>;
}

const AccordionRowCollapsed: React.FC<AccordionRowProps> = ({ country, expandCountry }) => {
	return (
		<Disclosure.Button as='button' onClick={async () => await expandCountry(country)}
            className='justify-items-around items-center flex w-full flex-row group hover:backdrop-brightness-125 rounded-md transition-all duration-300 ease-out'
            >
				<div className='ml-2.5 flex w-0 flex-1 items-center justify-start rounded-lg font-semibold transition-all duration-150 group-hover:text-vol-peach/75'>
					{country}
				</div>
				<div className='group mr-4 flex flex-row items-center justify-center rounded-md px-2 py-1 transition-all duration-150 ease-out hover:text-vol-base/50 group-hover:text-vol-peach/75'>
					<div>[{' '}</div>
					<>
						<div className='mx-2 mt-1 text-xs font-mono tracking-tigher items-center transition-all duration-200 ease-out group-hover:text-vol-peach/75'>
							view volcano list
						</div>
						<IoReturnUpForward className='ml-px mr-1 mt-px inline align-middle text-sm transition-all duration-200 ease-out group-hover:text-vol-peach/75' />
					</>
					<div>{' '}]</div>
				</div>
		</Disclosure.Button>
	);
};
export default AccordionRowCollapsed;
