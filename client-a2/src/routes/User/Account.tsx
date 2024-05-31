import { Cookie } from '@/lib/types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { IoEnterOutline } from 'react-icons/io5';
import { IoExitOutline } from 'react-icons/io5';
import { SpiralSpinner } from 'react-spinners-kit';
import { sleep, useStore, nameBuilder } from '@/lib';

const AccountDetails: React.FC = (): React.ReactElement => {
	const { reset } = useStore();
	const [jwt, setJwt] = useState<Cookie | undefined>(undefined);
	const [email, setEmail] = useState<string | undefined>(undefined);
	const [parseErr, setParseErr] = useState<string | undefined>(undefined);
	const [status, setStatus] = useState<string | undefined>(undefined);

	const navigate = useNavigate();



	/** Converts a JWT into the user's name, based on the name or word used before the `@` in their email.
	 **/
	function parseUserInfo() {
		if (jwt?.token && jwt?.expires_in && jwt?.token_type) {
			try {
				const decoded = JSON.parse(atob(jwt.token.split('.')[1]));
				if (decoded.email) {
					const checkTokenExpired =
						new Date(decoded.exp * 1000).getTime() - new Date(Date.now()).getTime();
					if (checkTokenExpired < 0) {
						setParseErr('Session expired');
						return;
					}
					setEmail(decoded.email);
				}
			} catch (err) {
				console.error('unable to parse jwt => ', err);
				setParseErr('Invalid token');
				return;
			}
		}
	}

	/**
	 * Checks for the presence of a locally stored JWT
	 * @returns {boolean} True if a JWT is found and could be set to the component's state, otherwise false.
	 */
	function checkSession(): boolean {
		const session = localStorage.getItem('SESSION');
		if (session) {
			try {
				const cookie = JSON.parse(session);
				setJwt({
					token: cookie.token,
					token_type: cookie.token_type,
					expires_in: cookie.expires_in,
				});
				if (jwt) {
					return true;
				}
			} catch (err) {
				console.error('unable to parse jwt => ', err);
				setParseErr('Invalid token');
				return false;
			}
		}

		return false;
	}

	/**
	 * Logs a user out, clearing any JWTs in local storage & resetting the data store to clear
	 * authorized data from the client's cache.
	 * @async
	 * @returns {Promise<void>} Navigates the user back to the `/account/login` page on completion.
	 */
	async function handleLogout(): Promise<void> {
		setStatus('logout');
		localStorage.clear();
		reset('data');
		await sleep(500);
		return navigate('/account/login');
	}

	useEffect(() => {
		if (!jwt) {
			checkSession();
			parseUserInfo();
		}
		if (jwt) {
			parseUserInfo();
		}
	}, [jwt]);

	return (
		<>
			<div>
				<div className='mt-48 flex h-full w-full flex-col items-center justify-center'>
					<div className='text-3xl font-bold'>Account</div>
				</div>

				{!jwt && (
					<>
						<div className='mt-12 flex h-full w-full flex-col items-center justify-center'>
							<div className='font-bold'>You must be logged in to view this page</div>

							<button
								className='mt-8 flex flex-row items-center space-x-2 font-medium text-vol-white transition-all duration-200 ease-out hover:text-vol-peach'
								onClick={() => handleLogout()}
							>
								<div>Click here to return to login</div>
								<IoEnterOutline className='text-xl' />
							</button>
						</div>
					</>
				)}

				{(email && (
					<>
						<div className='mt-12 flex flex-col items-center justify-center space-y-6'>
							<div className='text-xl font-medium'>
								Hello, <span>{nameBuilder(email)}</span>!
							</div>
							<button
								className='flex flex-row items-center space-x-3 font-medium text-vol-white transition-all duration-200 hover:text-vol-peach'
								onClick={() => handleLogout()}
							>
								<div>Log out</div>
								<IoExitOutline className='text-xl' />
							</button>
						</div>
					</>
				)) ??
					(parseErr && (
						<div className='mt-12 flex flex-col items-center justify-center space-y-4'>
							<div className='text-xl text-vol-orange'>{parseErr}</div>
							<button
								className='mt-8 flex flex-row items-center space-x-4 font-medium text-vol-white transition-all duration-200 ease-out hover:text-vol-peach'
								onClick={() => handleLogout()}
							>
								<div>Click here to return to login page</div>

								<IoEnterOutline className='text-xl' />
							</button>
						</div>
					))}

				{status === 'logout' ?
					<div className='mt-12 flex w-full flex-col items-center justify-center space-y-8 text-vol-base'>
						<div>Returning to login page...</div>
						<SpiralSpinner size={100} frontColor='#f1ae6a' backColor='#c62810' loading={true} />
					</div>
				:	<></>}
			</div>
		</>
	);
};

export default AccountDetails;
