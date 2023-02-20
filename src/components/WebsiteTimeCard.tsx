import React from 'react';
import CardHeader from './CardHeader';
import WebsitesIcon from './Icons/WebsitesIcon';
import HorizontalProgressBar from './ProgressBars/HorizontalProgressBar';
import FacebookIcon from './Icons/FacebookIcon';
import TwitterIcon from './Icons/TwitterIcon';
import LinkedinIcon from './Icons/LinkedinIcon';


interface Props {}


const WebsiteTimeCard: React.FC<Props> = () => {
  return (
    <div className="shadow-lg w-full rounded-3xl h-3/5">
      <div className='flex-row h-1/6 w-full'>
        <CardHeader title={{ text: "Minutes on Websites", size: "text-xl" }} icon={<WebsitesIcon/>}/>
      </div>
      
      <div className='flex h-5/6 mt-4 flex-col'>
        <div className='ml-8 h-1/5 w-full'>
          <p className='font-bold text-4xl '> 80/160</p>
        </div>
        <div className='ml-8 h-1/5 w-full'>
          <p className='text-1xl '> Facebook</p>
          <div className='flex flex-row items-center'>
          <div className='mr-3 w-8'>
          <FacebookIcon/>
          </div>
          <HorizontalProgressBar height={10} width={200} percentage={50} color={'#38393E'}/>
          </div>
        </div>
        <div className='ml-8 h-1/5 w-full'>
          <p> Twitter</p>
          <div className='flex flex-row items-center'>
          <div className='mr-3 w-8'>
            <TwitterIcon/>
          </div>
          <HorizontalProgressBar height={10} width={200} percentage={50} color={'#38393E'}/>
          </div>
        </div>
        <div className='ml-8 h-1/5 w-full'>
          <p > Linkedin</p>
          <div className='flex flex-row items-center'>
          <div className='mr-3 w-8'>
          <LinkedinIcon/>
          </div>
          <HorizontalProgressBar height={10} width={200} percentage={50} color={'#38393E'}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebsiteTimeCard;