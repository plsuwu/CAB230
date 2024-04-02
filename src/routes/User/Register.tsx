import { Link } from 'react-router-dom';

// function handleSubmitRegister(email: string, password: string, confirm: string) {
//
// }

const AccountRegister: React.FC = (): React.ReactElement => {


	return (
		<>
			<div className='mt-24 flex h-full w-full flex-col items-center justify-center text-3xl font-bold'>
				<div>Register</div>
			</div>
			<div className='flex min-h-full flex-1 flex-col justify-center px-8 py-12'>
				<div className='mx-auto mt-10 w-full max-w-sm'>
					<form className='space-y-6' action='newAccountPOST()' method='POST'>
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
									required
									className='block w-full rounded-lg border-0 bg-vol-crust p-2 py-1.5 text-sm leading-6 text-vol-champ shadow-sm ring-1 ring-inset ring-vol-base placeholder:text-vol-base focus:ring-inset'
								/>
							</div>
							<div className='mt-6'>
								<div className='flex items-center justify-between'>
									<label
										htmlFor='password'
										className='block text-sm font-medium italic leading-6 text-vol-base'
									>
										Password
									</label>
								</div>
								<div className='mt-2'>
									<input
										id='password'
										name='password'
										type='password'
										autoComplete='current-password'
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
									className='block text-sm font-medium italic leading-6 text-vol-base'
								>
									Confirm password
								</label>
							</div>
							<div className='mt-2'>
								<input
									id='confirm-password'
									name='confirm-password'
									type='password'
									autoComplete='confirm-password'
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
