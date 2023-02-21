import React from 'react';

interface HorizontalProgressBarProps {
  percentage: number;
}

const HorizontalProgressBar: React.FC<HorizontalProgressBarProps> = (props) => {

  return (
    <div className={`w-4/6 bg-gray-200 rounded-full h-2 dark:bg-gray-700`}>
      <div
        className={`bg-blue-600 h-2 rounded-full`}
        style={{ width: `${props.percentage}%` }}
      ></div>
    </div>
  );
};

export default HorizontalProgressBar;