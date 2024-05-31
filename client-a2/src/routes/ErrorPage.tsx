import { useRouteError } from 'react-router-dom';
import { MdVolcano } from 'react-icons/md';
import { RiArrowLeftLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const ErrorPage: React.FC = (): React.ReactElement => {
	const error: any = useRouteError(); // can't know the error type prior to throw
	return (
		<div id='error-page' className='flex h-screen flex-col items-center justify-center'>
			<div className='mb-20 text-6xl text-vol-red'>
				<MdVolcano />
			</div>
			<div className='flex flex-col items-center gap-4 '>
				<div className='italic opacity-55'>An error occurred while processing your request:</div>
				<h1 className='text-4xl font-bold text-vol-fawn'>{error.status}</h1>
				<div className='italic opacity-55'>({error.error?.message})</div>
				<Link
					to={'/'}
					className='mt-20 flex items-center transition-opacity duration-300 ease-out hover:opacity-55'
				>
					<RiArrowLeftLine className='mr-8 inline text-3xl' />
					<span className='font-semibold'>Return to the homepage</span>
				</Link>
			</div>
		</div>
	);
};

export default ErrorPage;
