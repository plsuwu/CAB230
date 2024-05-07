import { useState } from 'react';
import { postToApi, sleep, useStore } from '@/lib';
import { LoginForm, LoginStatus } from '@/components/login';
import { Link, useNavigate } from 'react-router-dom';
import parseToken from '@/lib/utils/token';
import { Cookie } from '@/lib/types';


const AccountLogin: React.FC = (): React.ReactElement => {
    const { data, reset } = useStore();
	const [formDataL, setFormDataL] = useState({ email: '', password: '' });
	const [loginResult, setLoginResult] = useState<string | undefined>(undefined);
	const [loginRequested, setLoginRequested] = useState<boolean>(false);
	const [headers, setHeaders] = useState<Cookie>({
		expires_in: null,
		token: null,
		token_type: null,
	});

    const navigate = useNavigate();

	const submitLogin = async (event: React.FormEvent) => {
		event.preventDefault();

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
							await parseToken(result);
							setLoginResult('Login success!');
                            reset(data);
                            await sleep(500);
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
							'An unknown issue occured during registration. Please try again later.'
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
		</>
	);
};

export default AccountLogin;
