import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AwardedContractBarChart = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Awarded Contracts',
                data: [],
                backgroundColor: [],
                borderColor: [],
                borderWidth: 2,
            },
        ],
    });
    const [minRange, setMinRange] = useState(1);
    const [maxRange, setMaxRange] = useState(5);

    const fetchData = (minRange, maxRange) => {
        axios.get('/top-companies', {
            params: {
                minRange: minRange,
                maxRange: maxRange,
            }
        })
            .then(response => {
                const colors = [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)'
                ];
                const borderColors = [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                ];

                setChartData({
                    labels: response.data.companies,
                    datasets: [
                        {
                            label: 'Awarded Contracts',
                            data: response.data.counts,
                            backgroundColor: colors,
                            borderColor: borderColors,
                            borderWidth: 2,
                        },
                    ],
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    useEffect(() => {
        fetchData(minRange, maxRange);
    }, []);

    const handleRangeChange = () => {
        fetchData(minRange, maxRange);
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: 'Top 5 Companies with Most Awarded Contracts',
            },
        },
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6 font-roboto">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Awarded Contract</h2>
                <div className="ml-4 flex items-center space-x-2">
                    <label htmlFor="minRange" className="text-sm font-medium text-gray-700">
                        Top:
                    </label>
                    <input
                        type="number"
                        id="minRange"
                        name="minRange"
                        min="1"
                        max="40"
                        value={minRange}
                        onChange={(e) => setMinRange(e.target.value)}
                        className="w-16 border border-gray-300 rounded-md px-2"
                    />
                    <label htmlFor="maxRange" className="text-sm font-medium text-gray-700">
                        -
                    </label>
                    <input
                        type="number"
                        id="maxRange"
                        name="maxRange"
                        min="1"
                        max="20"
                        value={maxRange}
                        onChange={(e) => setMaxRange(e.target.value)}
                        className="w-16 border border-gray-300 rounded-md px-2"
                    />
                    <button  onClick={handleRangeChange} className="font-bold font-lato text-sm ml-4 px-3 py-1 text-tblue bg-white border border-gray-300 rounded-lg shadow-md hover:text-blue-700 transition-all duration-200">
                        Apply
                    </button>
                </div>
            </div>
            <div className="h-64 w-full mt-4">
                <div style={{ height: '280px', width: '100%' }}>
                    <Bar data={chartData} options={options} />
                </div>
            </div>
        </div>
    );
};

export default AwardedContractBarChart;
