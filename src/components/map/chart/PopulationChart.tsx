import { useState, useEffect } from 'react';
import { VolcanoDetailDataProps } from '../VolcanoDetailData';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { _DeepPartialObject } from 'node_modules/chart.js/dist/types/utils';
import { SpiralSpinner } from 'react-spinners-kit';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PopulationChart: React.FC<VolcanoDetailDataProps> = ({ detail }): React.ReactElement => {
	const [dataReady, setDataReady] = useState(false);
	const [chartData, setChartData] = useState<any>({});

	useEffect(() => {
		if (detail && detail.length > 0) {
			const population = detail.flatMap((data) => [
				data.population_5km,
				data.population_10km,
				data.population_30km,
				data.population_100km,
			]);

			const labels = ['< 5km', '< 10km', '< 30km', '< 100km'];
			const data = {
				labels: labels,
				datasets: [
					{
						label: 'Population near this volcano',
						data: population,
						backgroundColor: [
							'rgba(255, 99, 132, 0.2)',
							'rgba(54, 162, 235, 0.2)',
							'rgba(255, 206, 86, 0.2)',
							'rgba(75, 192, 192, 0.2)',
						],
						borderColor: [
							'rgba(255, 99, 132, 1)',
							'rgba(54, 162, 235, 1)',
							'rgba(255, 206, 86, 1)',
							'rgba(75, 192, 192, 1)',
						],
						borderWidth: 1,
					},
				],
			};

			setChartData(data);
			setDataReady(true);
		}
	}, [detail]);

	if (!dataReady) {
		return (
			<div>
				<SpiralSpinner size={100} frontColor='#f1ae6a' backColor='#c62810' loading={true} />
			</div>
		);
	}

	const options: _DeepPartialObject<any> = {
		responsive: true,
		scales: {
			x: { ticks: { color: '#ffffff', font: { size: 14 } } },
			y: { ticks: { color: '#ffffff', font: { size: 14 } } },
		},
		plugins: {
			legend: {
				position: 'top',
				labels: { color: '#ffffff', font: { size: 14 } },
			},
			tooltip: { mode: 'index', intersect: false },
		},
	};

	return <Bar className='bg-vol-mantle p-2 rounded-md' data={chartData} options={options} />;
};

export default PopulationChart;
