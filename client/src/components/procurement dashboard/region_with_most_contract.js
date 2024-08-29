import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ContractsRegion = () => {
  const [state, setState] = useState('');
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchTopState = async () => {
      try {
        const response = await axios.get('/top-state');
        setState(response.data.state);
        setCount(response.data.count);
      } catch (error) {
        console.error('Error fetching top state data:', error);
      }
    };

    fetchTopState();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold">Region with Most Contracts</h3>
      <p className="text-2xl font-bold mt-4">
        {count} in {state}
      </p>
    </div>
  );
};

export default ContractsRegion;
