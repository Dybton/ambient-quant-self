import React from 'react';

const PlusIcon: React.FC = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-black stroke-current plus-icon"
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
