interface EmailProps {
    email: string;
    inputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const EmailInput: React.FC<EmailProps> = ({ email, inputChange }): React.ReactElement => {
    return (
        <>
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
                    value={email}
                    onChange={inputChange}
                    required
                    className='block w-full rounded-lg border-0 bg-vol-crust p-2 py-1.5 text-sm leading-6 text-vol-champ shadow-sm ring-1 ring-inset ring-vol-base placeholder:text-vol-base focus:ring-inset'
                />
            </div>
        </>
    );
}

export default EmailInput;
