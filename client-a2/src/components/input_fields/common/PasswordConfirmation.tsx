import { MatchingPasswords } from "@/components/input_fields";

interface ConfirmationProps {
    matching: boolean | undefined;
    confirmation: string;
    inputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordConfirmationInput: React.FC<ConfirmationProps> = ({
    matching,
    confirmation,
    inputChange,
}): React.ReactElement => {
    return (
        <>
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
                    id='confirmation'
                    name='confirmation'
                    type='password'
                    autoComplete='confirmation-password'
                    value={confirmation}
                    onChange={inputChange}
                    required
                    className='block w-full rounded-md border-0 bg-vol-crust p-2 py-1.5 text-sm leading-6 text-vol-champ shadow-sm ring-1 ring-inset ring-vol-base placeholder:text-vol-base focus:ring-inset'
                />
            </div>
        </>
    );
};

export default PasswordConfirmationInput;
