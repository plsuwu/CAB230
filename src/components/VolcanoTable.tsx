import { useState, useEffect } from 'react';
import { mkGET } from '../lib/mkGet';

const VolcanoTable: React.FC = (): React.ReactElement => {
    const [ loading, setLoading ] = useState(true);
    const [ volcanoes, setVolcanoes ] = useState(null);

    useEffect(() => {
        const fetchVolcanoData = async () => {
            try {
                const volcanoData = await mkGET(``);
            }
        }
    });

	return (
        <>

        </>
    );
};
