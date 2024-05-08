import { useEffect } from 'react';
import EmailInput from '@/components/input_fields/Email';
import PasswordInput from '@/components/input_fields/Password';
import PasswordConfirmationInput from '@/components/input_fields/PasswordConfirmation';

export type FormDataReg = {
	email: string;
	password: string;
	confirmation: string;
};

interface RegistrationFormProps {
	submitRegister: (event: React.FormEvent) => Promise<void>;
	formDataR: FormDataReg;
	setFormDataR: React.Dispatch<React.SetStateAction<FormDataReg>>;
	matching: boolean | undefined;
	setMatching: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({
	submitRegister,
	formDataR,
	setFormDataR,
	matching,
	setMatching,
}): React.ReactElement => {

    /**
     * determines whether a user successfully confirmed their password entry while registering
     * @param {string} a - string currently bound to the 'password' field
     * @param {string} b - string current bound to the 'confirmation' field
     * @returns {boolean} true if the two fields contain matching strings, false otherwise
     */
	const match = (a: string, b: string): boolean => {
		return a === b ? true : false;
	};


    /**
     * @param {React.ChangeEvent<HTMLInputElement>} event - a change event for the input element
     * @returns {void} side effect that sets the form data state
     */
	const inputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = event.target;
		setFormDataR((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	useEffect(() => {
		const pass = formDataR.password;
		const conf = formDataR.confirmation;

		if (pass !== '' && conf !== '') {
			setMatching(match(pass, conf));
		} else {
			setMatching(undefined);
		}
	}, [formDataR]);

	return (
		<div className='flex min-h-full flex-1 flex-col justify-center px-8 py-12'>
			<div className='mx-auto mt-10 w-full max-w-sm'>
				<form className='space-y-6' onSubmit={submitRegister}>
					<div>
						<EmailInput email={formDataR.email} inputChange={inputChange} />
						<div className='mt-6'>
							<PasswordInput password={formDataR.password} inputChange={inputChange} />
						</div>
					</div>
					<div className='mt-6'>
						<PasswordConfirmationInput
							matching={matching}
							confirmation={formDataR.confirmation}
							inputChange={inputChange}
						/>
					</div>
					<div>
						<button
							type='submit'
                            className='flex w-full justify-center rounded-md bg-vol-fawn px-3 py-1.5 leading-6 text-vol-crust text-sm font-bold hover:text-vol-fawn shadow-sm transition-all duration-300 ease-out hover:bg-vol-fawn/50'
						>
							Register
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default RegistrationForm;
