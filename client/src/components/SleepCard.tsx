import React from 'react';
import CardHeader from './CardHeader';
import SleepIcon from './Icons/SleepIcon';
import VerticalProgressBar from './ProgressBars/VerticalProgressBar';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client';

type SleepDuration = {
  date: string;
  day: string;
  duration: {
    hours: number;
    minutes: number;
  };
};

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

const calculateSleepPercentage = (hours: number, minutes: number) => {
  const totalMinutes = hours * 60 + minutes;
  const totalMinutesInDay = 9 * 60;
  const percentage = (totalMinutes / totalMinutesInDay) * 100;
  return percentage;
}

const SleepCard: React.FC = () => {
  const { loading, error, data } = useQuery(SLEEP_DURATION_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  
  const { sleepDuration } = data;

  return (
    <div className="shadow-lg w-full rounded-3xl h-3/6 mt-14 flex-row  divide-y-[2px]">
      <div className='flex-row h-1/6 mb-8'>
        <CardHeader title={{ text: 'Sleep', size: 'text-2xl' }} icon={<SleepIcon/>}/>
      </div>
      <div className="flex h-4/6 justify-between ">
        {sleepDuration.map((day: SleepDuration) => {

          const { hours, minutes } = day.duration
          const dayName = day.day;
          
          return SleepProgressBar(hours, minutes, dayName);
        })}

      </div>
    </div>
  );
};

const SleepProgressBar = (hours: number, minutes: number, weekDay: string) => {
  const sleepPercentage = calculateSleepPercentage(hours, minutes);
  const sleepTime = hours ? `${hours}h ${minutes}m` : "No data"

  return (
    <div className=" flex-1 flex flex-col justify-end items-center">
      <VerticalProgressBar label={sleepTime} percentage={sleepPercentage} id={`v${weekDay}`}/>
      <span>{weekDay}</span>
    </div>
  )
} 

export default SleepCard;