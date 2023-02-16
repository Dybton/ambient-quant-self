import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface CircularProgressBarProps {
  percentage: number;
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({ percentage }) => {
  return (
    <div>
      <div className="w-32 mx-auto">
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          styles={{
            path: { stroke: '#38393E' },
            text: { fill: '#38393E', fontSize: '14px' },
          }}
        />
      </div>
    </div>
  );
};

export default CircularProgressBar;
