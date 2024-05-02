import { IoCheckmarkSharp } from 'react-icons/io5';
import { IoCloseSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';

interface RegisterStatusProps {
	status: string | undefined;
}

const RegisterStatus: React.FC<RegisterStatusProps> = ({ status }): React.ReactElement => {
	return (
		<>
			{status !== undefined &&
				(status !== 'Registration success!' ?
					<div className='mt-8 flex w-full flex-col items-center justify-around space-y-4 text-center text-vol-orange'>
						<IoCloseSharp className='inline-flex text-2xl' />
						<div className='inline-flex'>{status}</div>
					</div>
				:	<div>
						<div className='mt-8 flex w-full flex-col items-center justify-around space-y-4 text-green-300'>
							<IoCheckmarkSharp className='inline-flex text-2xl ' />
                            <div className='flex flex-col space-y-2 items-center text-center justify-center'>
								<div className='inline-flex'>{status}</div>
                                <Link className='text-vol-peach underline hover:opacity-50 transition-opacity duration-300 ease-out' to='/account/login'>Click here to continue to the login page.</Link>
</div>
						</div>
					</div>)}

			{!status && (
				<div className='mt-8 inline-flex w-full items-center justify-around text-green-300'></div>
			)}
		</>
	);
};

export default RegisterStatus;
