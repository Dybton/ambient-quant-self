import React from 'react';
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip as ReactTooltip } from "react-tooltip";

interface VerticalProgressBarProps {
  percentage: number;
  id?: string;
}
const VerticalProgressBar: React.FC<VerticalProgressBarProps> = (props) => {
  return (
    <>
    <div
  className="mb-4 h-4/6 bg-gray-200 rounded-full w-2 dark:bg-gray-700 transform rotate-180" id={props.id ? `tooltip-id-${props.id}` : ''} >
      <div
        className="bg-blue-600 h-full rounded-full"
        style={{ height: `${props.percentage}%` }}
      ></div>
    </div>
    {props.id && <ReactTooltip
        anchorId={`tooltip-id-${props.id}`}
        place="top"
        content={`${props.percentage}%`}
      />}
    </>
  );
};

export default VerticalProgressBar;

