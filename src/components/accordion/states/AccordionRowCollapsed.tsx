import { Disclosure } from '@headlessui/react';
import { IoReorderTwoOutline } from "react-icons/io5";

interface AccordionRowProps {
    country: string;
    open: boolean;
    expandCountry: (country: string) => Promise<void>;
}

const AccordionRowCollapsed: React.FC<AccordionRowProps> = ({ country, expandCountry }) => {
    return (
        <div className='justify-items-around flex w-full flex-row'>
            <div className='ml-2.5 flex w-0 flex-1 items-center justify-start rounded-lg font-semibold'>
                {country}
            </div>
            <Disclosure.Button
                as='button'
                onClick={async () => await expandCountry(country)}
                className='flex-0 group mr-4 flex flex-row items-center justify-center rounded-md px-2 py-1 transition-all duration-500 ease-out hover:text-vol-base/50 group-hover:text-vol-peach/75'
            >
                [{' '}
                    <>
                        <span className='mx-2 mt-1 font-mono text-xs tracking-tighter transition-all duration-200 ease-out group-hover:text-vol-peach/75'>
                            view volcano list
                        </span>
                        <IoReorderTwoOutline className='ml-px mr-0.5 mt-px inline align-middle text-sm transition-all duration-200 ease-out group-hover:text-vol-peach/75' />
                    </>
                ]
            </Disclosure.Button>
        </div>
    );
};
export default AccordionRowCollapsed;
