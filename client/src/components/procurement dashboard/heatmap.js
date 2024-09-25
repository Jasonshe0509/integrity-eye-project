import React from 'react';

const Heatmap = () => {
    return (
        <div>
            <iframe
                src="http://localhost:5000/heatmap"
                className='w-full h-[300px] mt-2'
                title="Heatmap"
            />
        </div>
    );
};

export default Heatmap;
