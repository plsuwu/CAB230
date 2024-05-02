import { useEffect, useState } from 'react';
import { useStore, fetchFromApi, sleep } from '@/lib/index';
import type { Volcano } from '@/lib/types';
import { HiArrowLongRight } from 'react-icons/hi2';

import { AgGridReact } from 'ag-grid-react';
import { ICellRendererParams } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { Link } from 'react-router-dom';

interface VolcanoGridProps {
    country: string;
}

const VolcanoGrid: React.FC<VolcanoGridProps> = ({ country }): React.ReactElement => {
    const { data, add } = useStore();
    const [rowData, setRowData] = useState<Volcano[] | undefined>(undefined);
    const [columnDefs] = useState<any[]>([
        // { headerName: 'volcano id', field: 'id', flex: 1 },
        { headerName: 'name', field: 'name', flex: 1 },
        { headerName: 'volcano region', field: 'region', flex: 1 },
        { headerName: 'sub-region', field: 'subregion', flex: 2 },
        {
            headerName: 'volcanic data',
            field: 'id',
            type: 'rightAligned',
            cellRenderer: (props: ICellRendererParams) => { // idk how to pull this out into its own component
                return (
                    <>
                        <div className='flex flex-row items-center justify-end'>
                            <Link
                                to={`/volcanoes/${props.data.id}`}
                                className='group flex flex-row items-center space-x-2 px-2 transition-all duration-200 ease-out hover:text-vol-base/50'
                            >
                                <div className='text'>[</div>
                                <div className='group-hover:text-vol-peach/75 '>view data</div>
                                <HiArrowLongRight className='mt-px inline-flex group-hover:text-vol-peach/75' />
                                <div>]</div>
                            </Link>
                        </div>
                    </>
                );
            },
        },
    ]);

    const [loadingVolcanoes, setLoadingVolcanoes] = useState<boolean>(false);

    useEffect(() => {
        async function fetchVolcanoData(country: string) {
            setLoadingVolcanoes(true);
            await sleep(500);
            try {
                if (!data[country]) {
                    const volcanoes: Volcano[] = await fetchFromApi(`/volcanoes?country=${country}`);
                    add(country, volcanoes);
                }
            } catch (err) {
                console.error(`issue while fetching volcanoes for ${country}: `, err);
                setLoadingVolcanoes(false);
            } finally {
                setLoadingVolcanoes(false);
                return true;
            }
        }

        if (!rowData) {
            fetchVolcanoData(country);
            setRowData(data[country]);
        }
    }, [country, data[country]]);

    return (
        <>
            <div className='flex flex-col items-center justify-center'>
                {(rowData && (
                    <div className='ag-theme-quartz-dark mt-6 h-[650px] w-[65%]'>
                        <AgGridReact rowData={rowData} columnDefs={columnDefs} />
                    </div>
                )) ?? (
                        <div>
                            {!loadingVolcanoes ?
                                <div>unable to load volcano data!</div>
                                : <div>loading...</div>}
                        </div>
                    )}
            </div>
        </>
    );
};

export default VolcanoGrid;
