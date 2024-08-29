import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MinistryWithMostContracts = () => {
  const [ministryData, setMinistryData] = useState({ ministry: '', count: 0 });

  useEffect(() => {
    // Fetch the ministry with the most contracts
    axios.get('/top-ministry')
      .then(response => {
        setMinistryData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold">Ministry with Most Contracts</h3>
      <div className="flex items-baseline mt-4">
        <p className="text-2xl font-bold mr-20">{ministryData.count}</p>
        <p className="text-xs text-gray-600 -ml-14 ">{ministryData.ministry}</p>
      </div>
    </div>
  );
};

export default MinistryWithMostContracts;
