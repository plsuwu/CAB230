import { useState } from 'react';
import { postToApi } from '@/lib';
import { Link } from 'react-router-dom';
import { RegistrationStatus, RegistrationForm } from '@/components/input_fields';

const AccountRegister: React.FC = (): React.ReactElement => {
    const [formDataR, setFormDataR] = useState({ email: '', password: '', confirmation: '' });
    const [registerResult, setRegisterResult] = useState<string | undefined>(undefined);
    const [matching, setMatching] = useState<boolean | undefined>(undefined);
    const [registerRequested, setRegisterRequested] = useState<boolean>(false);

    /**
     * Handler to create a POSTable request from valid account data entered by a user &
     * reads the response to determine serverside validity.
     * @async
     * @param {React.FormEvent} event - the form submission event
     * @returns {Promise<void>} produces side effects that will set this component's state
     */
    const submitRegister = async (event: React.FormEvent): Promise<void> => {
        event.preventDefault();

        setRegisterRequested(true);
        setRegisterResult(undefined);
        setMatching(undefined);

        if (formDataR.password.length < 8) {
            setRegisterResult('Password must be 8 or more characters.');
            return;
        }

        if (formDataR.confirmation !== formDataR.password) {
            setRegisterResult("Password doesn't match the confirmation.");
            return;
        }

        const endpoint = '/user/register';
        const data = JSON.stringify(formDataR);
        try {
            const result: void | Response = await postToApi(endpoint, data);
            if (result) {
                switch (result.status) {
                    case 409:
                        setRegisterResult('An account with this email already exists.');
                        break;
                    case 400:
                        setRegisterResult('Registration requires both an email and password.');
                        break;
                    case 201:
                        setRegisterResult('Registration success!');
                        break;
                    default:
                        setRegisterResult(
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
            <div>
                <div className='mt-24 flex h-full w-full flex-col items-center justify-center text-3xl font-bold'>
                    <div>Register</div>
                </div>

                <RegistrationForm
                    submitRegister={submitRegister}
                    formDataR={formDataR}
                    setFormDataR={setFormDataR}
                    matching={matching}
                    setMatching={setMatching}
                />

                {registerRequested && <RegistrationStatus status={registerResult} />}

                <div className='mt-10 text-center text-sm'>
                    Already have an account?{' '}
                    <Link
                        to='/account/login'
                        className='transition-color ml-1 font-bold text-vol-white duration-300 ease-out hover:text-vol-peach'
                    >
                        Login here
                    </Link>
                </div>
            </div>
        </>
    );
};

export default AccountRegister;
