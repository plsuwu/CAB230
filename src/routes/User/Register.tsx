import { useState } from 'react';
import { postToApi } from '@/lib';
import { Link } from 'react-router-dom';
import RegisterStatus from '@/components/registration/RegisterRequestStatus';
import RegistrationForm from '@/components/registration/RegistrationForm';

const AccountRegister: React.FC = (): React.ReactElement => {
    const [formData, setFormData] = useState({ email: '', password: '', confirmation: '' });
    const [registerOk, setRegisterOk] = useState<string | undefined>(undefined);
    const [matching, setMatching] = useState<boolean | undefined>(undefined);

    const submitRegister = async (event: React.FormEvent) => {
        event.preventDefault();

        setRegisterOk(undefined);
        setMatching(undefined);

        if (formData.password.length < 8) {
            setRegisterOk('Password must be 8 or more characters.');
            return;
        }

        if (formData.confirmation !== formData.password) {
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
                        setRegisterOk(
                            'An unknown issue occured during registration. Please try again shortly.'
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
                <div>Register</div>
            </div>

            <RegistrationForm
                submitRegister={submitRegister}
                formData={formData}
                setFormData={setFormData}
                matching={matching}
                setMatching={setMatching}
            />
            <RegisterStatus status={registerOk} />

            <div className='mt-10 text-center text-sm'>
                Already have an account?{' '}
                <Link
                    to='/account/login'
                    className='transition-color font-bold duration-300 ease-out hover:text-vol-peach'
                >
                    Login here
                </Link>
            </div>
        </>
    );
};

export default AccountRegister;
