import React from 'react';
import CardHeader from './CardHeader';
import WebsitesIcon from './Icons/WebsitesIcon';

interface Props {}


const WebsiteTimeCard: React.FC<Props> = () => {
  return (
    <div className="shadow-lg w-full rounded-3xl h-3/5">
      <CardHeader title={{ text: "Minutes on Websites", size: "text-xl" }} icon={<WebsitesIcon/>}/>
      
    </div>
  );
};

export default WebsiteTimeCard;