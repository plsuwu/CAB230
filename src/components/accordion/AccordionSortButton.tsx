import { RiArrowDownLine } from 'react-icons/ri';
import { classNames } from '../../lib/utils/utils';

interface AccordionSortButtonProps {
    order: string;
    handleSwapOrder: () => void;
}

const AccordionSortButton: React.FC<AccordionSortButtonProps> = ({
    order,
    handleSwapOrder,
}): React.ReactElement => {
    return (
        <button
            onClick={() => handleSwapOrder()}
            className='flex flex-row content-center items-center justify-center space-x-2 transition-all duration-100 ease-out hover:text-vol-peach/75'
        >
            <div className='flex flex-row space-x-1 transition-all duration-500'>
                <div>[ </div>
                {order === 'd' ?
                    <div className='text-align-middle mt-0.5 self-center font-mono text-[10px]'>dsc</div>
                    : <div className='text-align-middle mt-0.5 self-center font-mono text-[10px]'>asc</div>}
                <div> ]</div>
            </div>
            <RiArrowDownLine
                className={classNames(
                    order === 'd' ? '' : 'rotate-180',
                    'inline-flex items-center transition-all duration-200 ease-out'
                )}
            />
        </button>
    );
};

export default AccordionSortButton;
