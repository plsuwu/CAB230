const LoginRemember: React.FC = (): React.ReactElement => {
    return (
        <>
            <div className='flex items-center justify-end m-2'>

                <input
                    id='remember'
                    name='remember'
                    type='checkbox'
                    className='rounded-md inline-flex ml-1 bg-vol-surface text-vol-fawn focus:border-1 focus:ring-1 focus:ring-vol-white focus:ring-opacity-0 focus:ring-offset-1'
                />
                <label
                    htmlFor='remember'
                    className='w-full text-sm font-medium italic leading-6 text-vol-base flex flex-col'
                >
                    <div className='ml-2'>Remember me</div>
                </label>

            </div>

        </>
    );
};

export default LoginRemember;
