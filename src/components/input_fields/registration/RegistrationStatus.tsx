import { IoCheckmarkSharp } from 'react-icons/io5';
import { SpiralSpinner } from 'react-spinners-kit';
import { IoCloseSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';

interface RegisterStatusProps {
	status: string | undefined;
}

const RegistrationStatus: React.FC<RegisterStatusProps> = ({ status }): React.ReactElement => {
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
							<div className='flex flex-col items-center justify-center space-y-2 text-center'>
								<div className='inline-flex'>{status}</div>
								<Link
									className='transition-all duration-300 ease-out text-blue-200 hover:text-vol-peach hover:opacity-100 opacity-75'
									to='/account/login'
								>
									Click here to continue to the login page
								</Link>
							</div>
						</div>
					</div>)}

			{!status && (

					<div className='mt-8 flex flex-col w-full items-center justify-around space-y-8'>

								<SpiralSpinner
									size={100}
									frontColor='#f1ae6a'
									backColor='#c62810'
									loading={1}
								/>
					<span className='opacity-50'>Loading...</span>
				</div>
			)}
		</>
	);
};

export default RegistrationStatus;
