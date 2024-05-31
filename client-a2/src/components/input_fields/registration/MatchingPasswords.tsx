import { IoCheckmarkSharp } from 'react-icons/io5';
import { IoCloseSharp } from 'react-icons/io5';

interface MatchingPasswordsProps {
	matching: boolean | undefined;
}

const MatchingPasswords: React.FC<MatchingPasswordsProps> = ({ matching }): React.ReactElement => {
	return (
		<>
			{matching !== undefined &&
				(matching ?
					<div className='inline-flex text-green-300 opacity-75'>
						<IoCheckmarkSharp className='text-xl' />
					</div>
				:	<div className='inline-flex items-center text-vol-orange'>
						<div className='inline-flex'>Passwords don't match</div>
                        <IoCloseSharp className='text-2xl inline-flex' />
					</div>)}
		</>
	);
};

export default MatchingPasswords;
