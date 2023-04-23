import React, { useEffect } from 'react';
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

enum Website {
  Facebook = 'facebook.com',
  Twitter = 'twitter.com',
  // Linkedin = 'linkedin.com',
}

const getIcon = (website: Website) => {
  switch (website) {
    case Website.Facebook:
      return <FacebookIcon />;
    case Website.Twitter:
      return <TwitterIcon />;
    // case Website.Linkedin:
    //   return <LinkedinIcon />;
    default:
      return null;
  }
};

const WebsiteTimeCard: React.FC = () => {
  const { loading, error, data} = useQuery(WEBSITE_TIME_QUERY);

  console.log("data", data)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const totalTime = data.timeSpent.reduce((acc: number, curr: { time: number }) => acc + curr.time, 0);

  if (!data.timeSpent || data.timeSpent.length === 0) {
    return <p>No data currently available.</p>;
  }

  return (
    <div className="shadow-lg w-full rounded-3xl h-3/5">
      <div className='flex-row h-1/6 w-full'>
        <CardHeader title={{ text: "Minutes on Websites", size: "text-base" }} icon={<WebsitesIcon/>}/>
      </div>
      
      <div className='flex mt-4 flex-col'>
        <div className='ml-8 mb-2 w-full'>
          <p className='font-bold text-3xl'>{totalTime}/160</p>
        </div>
        {data.timeSpent.map(({ website, time }: { website: string; time: number }) => (
          <WebSiteSection key={website} website={website as Website} time={time} />
        ))}
      </div>
    </div>
  );
};

type WebSiteSectionProps = {
  website: Website;
  time: number;
};

const getWebsitePercentage = (time: number) => {
  const totalMinutesInDay = 9 * 60;
  const percentage = (time / totalMinutesInDay) * 100;
  return percentage;
}

const WebSiteSection: React.FC<WebSiteSectionProps> = ({ website, time }) => (
  <div className='ml-8 h-1/5 w-full mb-3'>
    <p className='font-light'>{website}</p>
    <div className='flex flex-row items-center mt-1'>
      <div className='mr-1 w-8'>{getIcon(website)}</div>
      <HorizontalProgressBar percentage={getWebsitePercentage(time)} id={`h-${website}`} h={8} w={'4/6'} />
    </div>
  </div>
);

export default WebsiteTimeCard;
