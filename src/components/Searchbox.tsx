import { useState, useEffect } from 'react';
import { sleep } from '../lib/utils';

interface SearchProps {
	handleBufferedSearch: (input: string) => void;
}

const Searchbox: React.FC<SearchProps> = ({ handleBufferedSearch }): React.ReactElement => {
	const [bufferedInput, setBufferedInput] = useState('');
	// let currentSearchValue: string = '';

	const handleChangedInput = async (event: React.ChangeEvent<HTMLInputElement>) => {
		setBufferedInput(event.target.value);

		await sleep(10);


		// buffer searching - first, wait for input to stop (150ms timer)
		if (bufferedInput === event.target.value) {
			console.log(event.target.value);
			handleBufferedSearch(event.target.value);
		} else {

            // if input continues, buffer for another 100ms and run search function
            // anyway
			await sleep(10);
			console.log(event.target.value);
			handleBufferedSearch(event.target.value);
		}
	};

	return (
		<>
			<div>
				<input
					className='rounded-lg bg-vol-base px-2 py-1
                        text-sm text-vol-crust/75 transition-colors duration-200 placeholder:px-px placeholder:text-[12px] placeholder:font-medium
                        placeholder:italic placeholder:text-vol-crust focus:bg-vol-base/50 focus:text-vol-champ focus:outline-none'
					placeholder='Search for a country'
					type='text'
					onChange={(event) => handleChangedInput(event)}
				/>
			</div>
		</>
	);
};

export default Searchbox;
