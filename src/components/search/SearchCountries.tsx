interface SearchProps {
    searchBuffer: (input: string) => void;
}

const SearchCountries: React.FC<SearchProps> = ({ searchBuffer }): React.ReactElement => {
    const handleChangedInput = async (event: React.ChangeEvent<HTMLInputElement>) => {
        searchBuffer(event.target.value);
    };

    return (
        <>
            <div>
                <input
                    className='rounded-lg bg-vol-base px-2 py-1
                        text-sm text-vol-crust/75 transition-colors duration-200 placeholder:px-px placeholder:text-[12px] placeholder:font-medium
                        placeholder:italic placeholder:text-vol-crust focus:bg-vol-base/50 focus:text-vol-champ focus:outline-none'
                    placeholder='Search for a country'
                    type='text'
                    onChange={(event) => handleChangedInput(event)}
                />
            </div>
        </>
    );
};

export default SearchCountries;
