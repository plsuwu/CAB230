import { useEffect, useState } from 'react';
import { postToApi } from '@/lib';
import { Link } from 'react-router-dom';
import MatchingPasswords from '@/components/registration/MatchingPasswords';
import RegisterStatus from '@/components/registration/RegisterRequestStatus';

const AccountRegister: React.FC = (): React.ReactElement => {
	const [formData, setFormData] = useState({ email: '', password: '', passwordConfirm: '' });
	const [registerOk, setRegisterOk] = useState<string | undefined>(undefined);
	const [matching, setMatching] = useState<boolean | undefined>(undefined);

	const match = (a: string, b: string): boolean => {
		return a === b ? true : false;
	};

	const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	useEffect(() => {
		const pass = formData.password;
		const conf = formData.passwordConfirm;
		if (pass !== '' && conf !== '') {
			setMatching(match(pass, conf));
		} else {
			setMatching(undefined);
		}
	}, [formData]);

	const submitRegister = async (event: React.FormEvent) => {
		event.preventDefault();

		setRegisterOk(undefined);
        setMatching(undefined);

		if (formData.password.length < 8) {
			setRegisterOk('Password must be 8 or more characters.');
			return;
		}

		if (formData.passwordConfirm !== formData.password) {
			setRegisterOk("Password doesn't match the confirmation.");
			return;
		}

		const endpoint = '/user/register';
		const data = JSON.stringify(formData);

		try {
			const result: void | Response = await postToApi(endpoint, data);
			if (result) {
                switch (result.status) {
                    case 409:
					    setRegisterOk('An account with this email already exists.');
                        break;
                    case 400:
                        setRegisterOk('Registration requires both an email and password.');
                        break;
                    case 201:
                        setRegisterOk('Registration success!');
                        break;
                    default:
                        setRegisterOk('An unknown issue occured during registration. Please try again shortly.');
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
				<div>Register</div>
			</div>
			<div className='flex min-h-full flex-1 flex-col justify-center px-8 py-12'>
				<div className='mx-auto mt-10 w-full max-w-sm'>
					<form className='space-y-6' onSubmit={submitRegister}>
						<div>
							<div className='flex items-center justify-between'>
								<label
									htmlFor='email'
									className='block text-sm font-medium italic leading-6 text-vol-base'
								>
									Email
								</label>
							</div>
							<div className='mt-2'>
								<input
									id='email'
									name='email'
									type='email'
									autoComplete='email'
									value={formData.email}
									onChange={inputChange}
									required
									className='block w-full rounded-lg border-0 bg-vol-crust p-2 py-1.5 text-sm leading-6 text-vol-champ shadow-sm ring-1 ring-inset ring-vol-base placeholder:text-vol-base focus:ring-inset'
								/>
							</div>
							<div className='mt-6'>
								<div className='flex items-center justify-between'>
									<label
										htmlFor='confirm-password'
										className='flex w-full flex-row justify-between text-sm font-medium italic leading-6 text-vol-base'
									>
										<div className='inline-flex'>Password</div>
									</label>
								</div>

								<div className='mt-2'>
									<input
										id='password'
										name='password'
										type='password'
										autoComplete='current-password'
										value={formData.password}
										onChange={inputChange}
										required
										className='block w-full rounded-md border-0 bg-vol-crust p-2 py-1.5 text-sm leading-6 text-vol-champ shadow-sm ring-1 ring-inset ring-vol-base placeholder:text-vol-base focus:ring-inset'
									/>
								</div>
							</div>
						</div>
						<div className='mt-6'>
							<div className='flex items-center justify-between'>
								<label
									htmlFor='confirm-password'
									className='flex w-full flex-row justify-between text-sm font-medium italic leading-6 text-vol-base'
								>
									<div className='inline-flex'>Confirm password</div>
									<MatchingPasswords matching={matching} />
								</label>
							</div>
							<div className='mt-2'>
								<input
									id='passwordConfirm'
									name='passwordConfirm'
									type='password'
									autoComplete='confirm-password'
									value={formData.passwordConfirm}
									onChange={inputChange}
									required
									className='block w-full rounded-md border-0 bg-vol-crust p-2 py-1.5 text-sm leading-6 text-vol-champ shadow-sm ring-1 ring-inset ring-vol-base placeholder:text-vol-base focus:ring-inset'
								/>
							</div>
						</div>
						<div>
							<button
								type='submit'
								className='flex w-full justify-center rounded-md bg-vol-fawn px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm transition-all duration-300 ease-out hover:bg-vol-fawn/50'
							>
								Register
							</button>
						<RegisterStatus status={registerOk} />
						</div>
					</form>
					<div className='mt-10 text-center text-sm'>
						Already have an account?{' '}
						<Link
							to='/account/login'
							className='transition-color font-bold duration-300 ease-out hover:text-vol-peach'
						>
							Login here
						</Link>

					</div>
				</div>
			</div>
		</>
	);
};

export default AccountRegister;
