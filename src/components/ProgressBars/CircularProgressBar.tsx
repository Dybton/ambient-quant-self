import React, { useEffect, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

// Should probably take percentage as a prop
function CircularProgressBar() {
    const percentage = 20; 

  return (
<div>
<div className="w-32 mx-auto">
    <CircularProgressbar value={percentage} text={`${percentage}%`} 
      styles={{
        path: { stroke: '#38393E' },
        text: { fill: '#38393E', fontSize: '18px' },
      }}
    />
  </div>
</div>
  );
}


export default CircularProgressBar;