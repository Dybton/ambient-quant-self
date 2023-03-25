import React from 'react';
import CardHeader from './CardHeader';
import SleepIcon from './Icons/SleepIcon';
import VerticalProgressBar from './ProgressBars/VerticalProgressBar';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client';

const calculateSleepPercentage = (hours: number, minutes: number) => {
  const totalMinutes = hours * 60 + minutes;
  const totalMinutesInDay = 8 * 60;
  const percentage = (totalMinutes / totalMinutesInDay) * 100;
  return percentage;
}

const SLEEP_DURATION_QUERY = gql`
  query {
    sleepDuration {
      date
      day
      duration {
        hours
        minutes
      }
    }
  }
`;

const SleepCard: React.FC = () => {
  const { loading, error, data } = useQuery(SLEEP_DURATION_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  
  const { sleepDuration } = data;

  sleepDuration.forEach((day: any) => {
    const { hours, minutes } = day.duration;
    const dayName = day.day;
    console.log(dayName, hours, minutes)
  });

  return (
    <div className="shadow-lg w-full rounded-3xl h-3/6 mt-14 flex-row  divide-y-[2px]">
      <div className='flex-row h-1/6 mb-8'>
        <CardHeader title={{ text: 'Sleep', size: 'text-2xl' }} icon={<SleepIcon/>}/>
      </div>
      <div className="flex h-4/6 justify-between ">
        {sleepDuration.map((day: { duration: { hours: number; minutes: number; }; day: string; }) => {
          const { hours, minutes } = day.duration;
          const dayName = day.day;

          const sleepPercentage = calculateSleepPercentage(hours, minutes);
          const sleepTime = hours ? `${hours}h ${minutes}m` : "No data"
          
          return (
            <div className=" flex-1 flex flex-col justify-end items-center">
              <VerticalProgressBar label={sleepTime} percentage={sleepPercentage} id={`v${dayName}`}/>
              <span>{dayName}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SleepCard;