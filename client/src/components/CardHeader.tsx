import React, { SVGProps } from 'react';


type CardHeaderProps = {
  title: {
    text: string;
    size: string;
  };
  icon: React.ReactElement<SVGProps<SVGSVGElement>>;
};

const CardHeader: React.FC<CardHeaderProps> = ({ title, icon }) => {
  return (
  <div>
    <div className='float-left mt-6 ml-8'> <h1 className={`font-light ${title.size}`}>{title.text}</h1></div>
    <div className='float-right mt-6 mr-8'>
      {icon}
    </div>
  </div>
  );
};

export default CardHeader;
