import React from 'react';
import CardHeader from './CardHeader';
import WebsitesIcon from './Icons/WebsitesIcon';
import HorizontalProgressBar from './ProgressBars/HorizontalProgressBar';
import FacebookIcon from './Icons/FacebookIcon';
import TwitterIcon from './Icons/TwitterIcon';
import LinkedinIcon from './Icons/LinkedinIcon';
import { gql, useQuery } from '@apollo/client';


const WEBSITE_TIME_QUERY = gql`
  query {
    timeSpent {
      website
      time
    }
  }
`;

const WebsiteTimeCard: React.FC = () => {

  const { loading, error, data } = useQuery(WEBSITE_TIME_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="shadow-lg w-full rounded-3xl h-3/5">
      <div className='flex-row h-1/6 w-full'>
        <CardHeader title={{ text: "Minutes on Websites", size: "text-base" }} icon={<WebsitesIcon/>}/>
      </div>
      
      <div className='flex mt-4 flex-col'>
        <div className='ml-8 mb-2 w-full'>
          <p className='font-bold text-3xl '> 80/160</p>
        </div>
        <div className='ml-8 h-1/5 w-full mb-3'>
          <p className='font-light'> Facebook</p>
          <div className='flex flex-row items-center mt-1'>
            <div className='mr-1 w-8'>
              <FacebookIcon/>
            </div>
            <HorizontalProgressBar percentage={20} id={'h1'} h={8} w={'4/6'}/>
          </div>
        </div>
        <div className='ml-8 h-1/5 w-full mb-3'>
          <p className='font-light '> Twitter</p>
          <div className='flex flex-row items-center mt-1'>
          <div className='mr-1 w-8'>
            <TwitterIcon/>
          </div>
          <HorizontalProgressBar percentage={50} id={'h2'} h={8} w={'4/6'}/>
          </div>
        </div>
        <div className='ml-8 h-1/5 w-full mb-3'>
          <p className='font-light '> Linkedin</p>
          <div className='flex flex-row items-center mt-1'>
          <div className='mr-1 w-8'>
          <LinkedinIcon/>
          </div>
          <HorizontalProgressBar percentage={50} id={'h3'} h={8} w={'4/6'}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebsiteTimeCard;