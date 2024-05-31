import { useEffect, useState } from 'react';
import { useStore, fetchFromApi, sleep } from '@/lib/index';
import type { Volcano } from '@/lib/types';
import { HiArrowLongRight } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react';
import { ICellRendererParams } from 'ag-grid-community';
import { SpiralSpinner } from 'react-spinners-kit';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

interface VolcanoGridProps {
	country: string;
}

const VolcanoGrid: React.FC<VolcanoGridProps> = ({ country }): React.ReactElement => {
	const { data, add } = useStore();
	const [rowData, setRowData] = useState<Volcano[] | undefined>(undefined);
	const [columnDefs] = useState<any[]>([
		// { headerName: 'volcano id', field: 'id', flex: 1 },
		{ headerName: 'name', field: 'name', flex: 5 },
		{ headerName: 'volcano region', field: 'region', flex: 5 },
		{ headerName: 'sub-region', field: 'subregion', flex: 6 },
		{
			headerName: 'volcanic data',
			field: 'id',
			type: 'rightAligned',
			flex: 3,
			cellRenderer: (props: ICellRendererParams) => {
				// not sure how to pull this out into a component
				return (
					<>
						<div className='flex w-full flex-row items-center justify-end'>
							<Link
								to={`/volcanoes/${country}/${props.data.id}`}
                                state={{ country: country }}
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

	const [loadingVolcanoes, setLoadingVolcanoes] = useState<boolean>(true);

	useEffect(() => {
        /**
        * Loads an array of volcanoes for a specified country
        * @param {string} country - selected country to load volcanoes for
        * @returns {Promise<void>} creates side effect to set the component's state
        */
		async function fetchVolcanoData(country: string): Promise<void> {
			setLoadingVolcanoes(true);
			await sleep(100);
			try {
				if (!data[country]) {
					const volcanoes: Volcano[] = await fetchFromApi(`/volcanoes?country=${country}`);
					add(country, volcanoes);
				}
			} catch (err) {
				console.error(`issue while fetching volcanoes for ${country}: `, err);
			} finally {
				setLoadingVolcanoes(false);
			}
		}

		if (!rowData) {
			fetchVolcanoData(country);
			setRowData(data[country] as Volcano[]);
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
					<div className='mt-24 flex flex-row'>
						{!loadingVolcanoes ?
							<div className='text-xl font-medium text-vol-red'>
								Unable to load volcano data!
							</div>
						:	<div>
								<SpiralSpinner
									size={100}
									frontColor='#f1ae6a'
									backColor='#c62810'
									loading={loadingVolcanoes}
								/>
							</div>
						}
					</div>
				)}
			</div>
		</>
	);
};

export default VolcanoGrid;
