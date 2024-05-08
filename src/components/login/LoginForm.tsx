import EmailInput from '@/components/input-fields/Email';
import PasswordInput from '@/components/input-fields/Password';
import LoginRemember from './Remember';

export type FormDataLogin = {
    email: string;
    password: string;
};

interface LoginFormProps {
    submitLogin: (event: React.FormEvent) => Promise<void>;
    formDataL: FormDataLogin;
    setFormDataL: React.Dispatch<React.SetStateAction<FormDataLogin>>;
}

const LoginForm: React.FC<LoginFormProps> = ({
    submitLogin,
    formDataL,
    setFormDataL,
}): React.ReactElement => {
    const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormDataL((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    return (
        <div className='flex min-h-full flex-1 flex-col justify-center px-8 py-12'>
            <div className='mx-auto mt-10 w-full max-w-sm'>
                <form className='space-y-6' onSubmit={submitLogin}>
                    <div>
                        <EmailInput email={formDataL.email} inputChange={inputChange} />
                        <div className='mt-6 flex flex-col'>
                            <PasswordInput password={formDataL.password} inputChange={inputChange} />
                            <LoginRemember />

                        </div>
                    </div>
                    <div>
                        <button
                            type='submit'
                            className='flex w-full justify-center rounded-md bg-vol-fawn px-3 py-1.5 leading-6 text-vol-crust text-sm font-bold hover:text-vol-fawn shadow-sm transition-all duration-300 ease-out hover:bg-vol-fawn/50'
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
