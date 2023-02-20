import React from 'react';

interface HorizontalProgressBarProps {
  height: number;
  width: string;
  percentage: number;
}

const HorizontalProgressBar: React.FC<HorizontalProgressBarProps> = (props) => {
  return (
    <div className={`w-${props.width} bg-gray-200 rounded-full h-${props.height} dark:bg-gray-700`}>
      <div
        className={`bg-blue-600 h-${props.height} rounded-full`}
        style={{ width: `${props.percentage}%` }}
      ></div>
    </div>
  );
};

export default HorizontalProgressBar;