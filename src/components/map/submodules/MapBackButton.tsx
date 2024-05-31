import { useNavigate } from 'react-router';
import { IoReturnUpBack } from 'react-icons/io5';

const MapBackButton: React.FC = (): React.ReactElement => {
    const navigate = useNavigate();

	return (
		<button
			className='group mb-4 flex flex-row items-center space-x-2 text-sm transition-all duration-300 ease-out group-hover:text-vol-peach group-hover:opacity-55'
			onClick={() => navigate(-1)}
		>
			<div className='group transition-all duration-300 ease-out group-hover:text-vol-peach group-hover:opacity-55'>
				[
			</div>
			<IoReturnUpBack className='group transition-all duration-300 ease-out group-hover:text-vol-peach group-hover:opacity-55' />
			<div className='group transition-all duration-300 ease-out group-hover:text-vol-peach group-hover:opacity-55'>
				go back
			</div>
			<div className='group transition-all duration-300 ease-out group-hover:text-vol-peach group-hover:opacity-55'>
				]
			</div>
		</button>
	);
};

export default MapBackButton;
