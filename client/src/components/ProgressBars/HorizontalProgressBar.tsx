import React from 'react';
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip as ReactTooltip } from "react-tooltip";

interface HorizontalProgressBarProps {
  percentage: number;
  id: string;
  h: number;
  w?: string;
}

const HorizontalProgressBar: React.FC<HorizontalProgressBarProps> = (props) => {
  return (
    <>
      <div
        className="w-4/6 bg-gray-200 rounded-full dark:bg-gray-700"
        id={props.id ? `tooltip-id-${props.id}` : ''}
        style={{ height: `${props.h}px` }}
      >
        <div
          className="bg-blue-600 rounded-full"
          style={{
            width: `${Math.min(props.percentage, 100)}%`,
            height: `${props.h}px`,
          }}
        ></div>
      </div>
      {props.id && (
        <ReactTooltip
          anchorId={`tooltip-id-${props.id}`}
          place="top"
          content={`${props.percentage}%`}
        />
      )}
    </>
  );
};

export default HorizontalProgressBar;
