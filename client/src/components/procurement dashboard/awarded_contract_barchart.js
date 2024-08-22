import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AwardedContractBarChart = () => {
    const data = {
        labels: ['MAJU PERTAMA ENTERPRISE', 'NOVELCO (M) SDN. Ltd.', 'SOH TRADING', 'MEDICA RESOURCES SDN. BHD.', 'XCEED SECURITY SDN. BHD.', 'KHARISMA WIRA SDN. BHD.', 'BAY WATCH ELV SYSTEM SDN. BHD.', 'PTS RESOURCES SDN. BHD.', 'LOTUS SYMPHONY SDN. BHD.', 'HBT FORCE (M) SDN. BHD.'],
        datasets: [
            {
                label: 'Awarded Contracts',
                data: [12, 19, 3, 5, 2, 3, 7, 9, 10, 12],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false, // Ensure the chart fills the container
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
            },
        },
    };

    return (
        <div style={{ height: '280px', width: '100%' }}>
            <Bar data={data} options={options} />
        </div>
    );
};

export default AwardedContractBarChart;
