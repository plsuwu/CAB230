import { useState } from 'react';
import { LoginForm, LoginStatus } from '@/components/input_fields';
import { Link, useNavigate } from 'react-router-dom';
import { postToApi, sleep, useStore, storeToken } from '@/lib';

const AccountLogin: React.FC = (): React.ReactElement => {
	const { reset } = useStore();
	const [formDataL, setFormDataL] = useState({ email: '', password: '' });
	const [loginResult, setLoginResult] = useState<string | undefined>(undefined);
	const [loginRequested, setLoginRequested] = useState<boolean>(false);

	const navigate = useNavigate();

	/**
	 * Handler to create a POSTable request from valid account data entered by a user &
	 * reads the response to determine serverside validity.
	 * @async
	 * @param {React.FormEvent} event - the form submission event
	 * @returns {Promise<void>} produces side effects that will set this component's state
	 */
	const submitLogin = async (event: React.FormEvent): Promise<void> => {
		event.preventDefault(); // prevents default form behaviour
		setLoginRequested(true);
		setLoginResult(undefined);
		const endpoint = '/user/login';
		const data = JSON.stringify(formDataL);

		try {
			const result: void | Response = await postToApi(endpoint, data);
			if (result) {
				switch (result.status) {
					case 200:
						try {
							await storeToken(result); // pass successful login response to JWT storage function
							setLoginResult('Login success!');
							reset(data);
							await sleep(500); // pause execution to allow user to read feedback
							navigate('/account/me');
						} catch (err) {
							console.error('error while parsing auth token => ', err);
						}
						break;

					case 401:
						setLoginResult('Incorrect email or password.');
						break;

					case 400:
						setLoginResult('Logging in requires both an email and password.');
						break;

					default:
						setLoginResult(
							'An unknown issue occurred during login. Please try again later.'
						);
						break;
				}
			}
		} catch (err) {
			console.log('Err in API post => ', err);
		}
	};
	return (
		<>
			<div>
				<div className='mt-24 flex h-full w-full flex-col items-center justify-center text-3xl font-bold'>
					<div>Login</div>
				</div>

				<LoginForm submitLogin={submitLogin} formDataL={formDataL} setFormDataL={setFormDataL} />
				{loginRequested && <LoginStatus status={loginResult} />}
				{loginResult !== 'Login success!' && (
					<div className='mt-10 text-center text-sm'>
						Don't have an account?{' '}
						<Link
							to='/account/register'
							className='transition-color font-bold text-white duration-300 ease-out hover:text-vol-peach'
						>
							Register here
						</Link>
					</div>
				)}
			</div>
		</>
	);
};

export default AccountLogin;
