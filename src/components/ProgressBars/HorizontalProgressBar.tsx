import React from 'react';
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip as ReactTooltip } from "react-tooltip";

interface HorizontalProgressBarProps {
  percentage: number;
  id?: number;
  height?: number;
  width?: number;
}

const HorizontalProgressBar: React.FC<HorizontalProgressBarProps> = (props) => {
  return (
    <>
    <div
  className={`w-${props.width || '4/6'} bg-gray-200 rounded-full h-${props.height || '2'} dark:bg-gray-700`} id={props.id ? `tooltip-id-${props.id}` : ''} >
      <div
        className={`bg-blue-600 h-2 rounded-full`}
        style={{ width: `${props.percentage}%` }}
      ></div>
    </div>
    {props.id && <ReactTooltip
        anchorId={`tooltip-id-${props.id}`}
        place="bottom"
        content={`${props.percentage}%`}
      />}
    </>
  );
};

export default HorizontalProgressBar;
