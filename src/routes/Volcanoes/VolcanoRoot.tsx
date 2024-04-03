// import { volcanoes, countries } from '../../lib/exampleData';
import { useState, useEffect } from 'react';
import { useStore } from '../../lib/cache/storeContext.ts';
import Accordion from '../../components/Accordion';

const VolcanoRoot: React.FC = (): React.ReactElement => {
    const { data, isLoading, error } = useStore();

    const sortOptions: string[] = ['Country', 'Name']; // could do other sort options e.g 'activity', 'altitude', 'most populated', ...
    const volcanoAccordionTitle: string = 'Global Catalog of Volcanoes';

    // /* http://4.237.58.241:3000/volcanoes?country=${country} */
    //
    // let endpoint = 'volcanoes?country=${c}'

    // /* impl filterParams: */
    //
    // if (filterParams) {
    //     endpoint = `${endpoint}&${filterParams}`;
    // };




    return (
        <>
            {isLoading ? ( <div>loading...</div> )
            : (
                <div>
                    <Accordion
                        title={volcanoAccordionTitle}
                        sortOptions={sortOptions}
                    />
                </div>
            )}
        </>
    );
};
export default VolcanoRoot;
