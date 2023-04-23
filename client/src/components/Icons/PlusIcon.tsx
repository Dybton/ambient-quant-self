import React from 'react';

type PlusIconProps = {
  onClick: () => void;
};

const PlusIcon: React.FC<PlusIconProps> = ({ onClick }) => (
  <svg
    onClick={onClick}
    width="24"
    height="24"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-black stroke-current plus-icon hover:text-blue-500"
  >
    <path
      d="M15 4V26"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4 15H26"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default PlusIcon;
