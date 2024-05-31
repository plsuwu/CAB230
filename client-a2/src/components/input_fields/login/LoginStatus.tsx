import { IoCheckmarkSharp } from 'react-icons/io5';
import { IoCloseSharp } from 'react-icons/io5';
import { SpiralSpinner } from 'react-spinners-kit';

interface LoginStatusProps {
	status: string | undefined;
}

const LoginStatus: React.FC<LoginStatusProps> = ({ status }): React.ReactElement => {

	return (
		<>
			{status !== undefined &&
				(status !== 'Login success!' ?
					<div className='mt-8 flex w-full flex-col items-center justify-around space-y-4 text-center text-vol-orange'>
						<IoCloseSharp className='inline-flex text-2xl' />
						<div className='inline-flex'>{status}</div>
					</div>
				:	<div>
						<div className='mt-8 flex w-full flex-col items-center justify-around space-y-4 text-green-300'>
							<IoCheckmarkSharp className='inline-flex text-2xl ' />
							<div className='flex flex-col items-center justify-center space-y-2 text-center'>
								<div className='inline-flex'>{status}</div>
							</div>
						</div>
					</div>)}

			{!status ||
				(status === 'Login success!' && (
					<div className='mt-8 flex w-full flex-col items-center justify-around space-y-8'>
						<SpiralSpinner size={100} frontColor='#f1ae6a' backColor='#c62810' loading={true} />
						<span className='opacity-50'>
							{!status ?
								<span>Loading</span>
							:	<span>Redirecting</span>}
							...
						</span>
					</div>
				))}
		</>
	);
};

export default LoginStatus;
