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

    useEffect(() => {
        axios.get('/top-companies')
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
    }, []);

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
        <div style={{ height: '280px', width: '100%' }}>
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default AwardedContractBarChart;
