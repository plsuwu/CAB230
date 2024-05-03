import { useEffect } from 'react';
import EmailInput from '@/components/input-fields/Email';
import PasswordInput from '@/components/input-fields/Password';
import PasswordConfirmationInput from '@/components/input-fields/PasswordConfirmation';

export type TypedFormData = {
    email: string;
    password: string;
    confirmation: string;
};

interface RegistrationFormProps {
    submitRegister: (event: React.FormEvent) => Promise<void>;
    formData: TypedFormData;
    setFormData: React.Dispatch<React.SetStateAction<TypedFormData>>;
    matching: boolean | undefined;
    setMatching: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({
    submitRegister,
    formData,
    setFormData,
    matching,
    setMatching,
}): React.ReactElement => {
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
        const conf = formData.confirmation;
        if (pass !== '' && conf !== '') {
            setMatching(match(pass, conf));
        } else {
            setMatching(undefined);
        }
    }, [formData]);

    return (
        <div className='flex min-h-full flex-1 flex-col justify-center px-8 py-12'>
            <div className='mx-auto mt-10 w-full max-w-sm'>
                <form className='space-y-6' onSubmit={submitRegister}>
                    <div>
                        <EmailInput email={formData.email} inputChange={inputChange} />
                        <div className='mt-6'>
                            <PasswordInput password={formData.password} inputChange={inputChange} />
                        </div>
                    </div>
                    <div className='mt-6'>
                        <PasswordConfirmationInput
                            matching={matching}
                            confirmation={formData.confirmation}
                            inputChange={inputChange}
                        />
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
            </div>
        </div>
    );
};

export default RegistrationForm;
