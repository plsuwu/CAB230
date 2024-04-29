import { RiArrowDownLine } from 'react-icons/ri';
import { classNames } from '../../lib/utils/utils';

interface AccordionSortButtonProps {
    order: string;
    searchTerm: string | undefined;
    handleReOrder: () => void;
    setSearchTerm: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const AccordionSortButton: React.FC<AccordionSortButtonProps> = ({
    order,
    searchTerm,
    handleReOrder,
    setSearchTerm,
}): React.ReactElement => {
    return (
        <>
            {(!searchTerm || searchTerm === '') && (
                <button
                    onClick={() => handleReOrder()}
                    className='flex flex-row content-center items-center justify-center space-x-2 transition-all duration-100 ease-out hover:text-vol-peach/75'
                >
                    <div className='flex flex-row space-x-1 transition-all duration-500'>
                        {' '}
                        <div>[ </div>
                        {order === 'd' ?
                            <div className='text-align-middle mt-0.5 self-center font-mono text-[10px]'>
                                dsc
                            </div>
                            : <div className='text-align-middle mt-0.5 self-center font-mono text-[10px]'>
                                {' '}
                                asc
                            </div>
                        }
                        <div> ]</div>
                    </div>
                    <RiArrowDownLine
                        className={classNames(
                            order === 'd' ? '' : 'rotate-180',
                            'inline-flex items-center transition-all duration-200 ease-out'
                        )}
                    />
                </button>
            )}
            {searchTerm && searchTerm !== '' && (
                <button onClick={() => setSearchTerm(undefined)} className='flex flex-row content-center items-center justify-center space-x-2 transition-all duration-100 ease-out hover:text-vol-peach/75'>
                    <div className='flex flex-row space-x-1 transition-all duration-500'>
                        <div>[ </div>
                        <div className='text-align-middle mt-0.5 self-center font-mono text-[10px]'> - </div>
                        <div> ]</div>

                        <div
                            className={classNames(
                                order === 'd' ? '' : 'rotate-180',
                                'inline-flex items-center transition-all duration-200 ease-out'
                            )}
                        >

                            {/* hateful towards css and layout shift but this simply works */}
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </div>
                    </div>
                </button>
            )}
        </>
    );
};

export default AccordionSortButton;
