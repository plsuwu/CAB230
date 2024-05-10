import { IoReturnUpBack } from 'react-icons/io5';

interface AccordionRowProps {
	country: string;
	activeCountry: string;
	open: boolean;
	collapseCountry: (country: string) => Promise<void>;
}

const AccordionRowExpanded: React.FC<AccordionRowProps> = ({ country, activeCountry, collapseCountry }) => {
	return (
		<>
			<button
				onClick={async () => await collapseCountry(activeCountry)}
				className='group flex w-full flex-row items-center justify-start rounded-md px-1 pb-2 transition-all duration-500 ease-out hover:text-vol-base/50 group-hover:text-vol-peach/75'
			>
				[{' '}
				<>
					<IoReturnUpBack className='mx-1.5 text-sm transition-all duration-200 ease-out group-hover:text-vol-peach/75' />
					<div className='mx-1.5 mt-0.5 inline-flex font-mono text-xs tracking-tighter transition-all duration-200 ease-out group-hover:text-vol-peach/75'>
					    go back to countries
                    </div>
				</>
				]
			</button>
			<div className='flex w-full flex-col space-y-2 items-center justify-around rounded-md bg-vol-surface/50 p-1.5 transition-all duration-200 ease-in-out'>
					<div className='text-sm font-normal'>Volcanoes near </div>{' '}
					<div className='text-2xl font-bold'>{country}</div>
			</div>
		</>
	);
};
export default AccordionRowExpanded;
