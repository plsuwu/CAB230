import { sleep, useStore } from '@/lib';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { SpiralSpinner } from 'react-spinners-kit';

const AccountLogout: React.FC = () => {
    const { reset } = useStore();
	const navigate = useNavigate();

	const logout = async () => {
		await sleep(1000);
        reset('data');
        localStorage.clear();
		navigate('/account/login');
	};

	useEffect(() => {
		logout();
	}, []);

	return (
		<div className='flex w-full flex-col items-center justify-center space-y-6 mt-24'>
			<div className='opacity-55'>Please wait while you are logged out...</div>
			<SpiralSpinner size={100} frontColor='#f1ae6a' backColor='#c62810' loading={true} />
		</div>
	);
};

export default AccountLogout;
