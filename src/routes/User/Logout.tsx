import { sleep, useStore } from '@/lib';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { SpiralSpinner } from 'react-spinners-kit';

const AccountLogout: React.FC = () => {
	const { reset } = useStore();
	const navigate = useNavigate();

	/**
	 * Handler to log a user out, clearing authorized data in the cache and any locally stored session tokens,
	 * and finally redirecting the user back to the login page.
	 * @async
	 * @returns {Promise<void>} redirects the user back the the `/account/login` page on resolution
	 * */
	const logout = async (): Promise<void> => {
		await sleep(100);
		reset('data');
		localStorage.clear();
		navigate('/account/login');
	};

	useEffect(() => {
		logout();
	}, []);

	return (
		<div className='mt-24 flex w-full flex-col items-center justify-center space-y-6'>
			<div className='opacity-55'>Please wait while you are logged out...</div>
			<SpiralSpinner size={100} frontColor='#f1ae6a' backColor='#c62810' loading={true} />
		</div>
	);
};

export default AccountLogout;
