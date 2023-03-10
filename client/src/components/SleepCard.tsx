import React from 'react';
import { SleepData } from '../Types/Types';
import CardHeader from './CardHeader';
import SleepIcon from './Icons/SleepIcon';
import VerticalProgressBar from './ProgressBars/VerticalProgressBar';

const sleepData : SleepData[] = [{day: 'Mon', hours: 6, minutes: 22}, {day: 'Tue', hours: 6, minutes: 11}, {day: 'Wed', hours: 6, minutes: 11}, {day: 'Thu', hours: 6, minutes: 11}, {day: 'Fri', hours: 6, minutes: 11}, {day: 'Sat', hours: 2, minutes: 11}, {day: 'Sun', hours: 6, minutes: 11}];

const calculateSleepPercentage = (hours: number, minutes: number) => {
  const totalMinutes = hours * 60 + minutes;
  const totalMinutesInDay = 8 * 60;
  const percentage = (totalMinutes / totalMinutesInDay) * 100;
  return percentage;
}

const SleepCard: React.FC = () => {
  return (
    <div className="shadow-lg w-full rounded-3xl h-3/6 mt-14 flex-row  divide-y-[2px]">
      <div className='flex-row h-1/6 mb-8'>
        <CardHeader title={{ text: 'Sleep', size: 'text-2xl' }} icon={<SleepIcon/>}/>
      </div>
      <div className="flex h-4/6 justify-between ">
        {sleepData.map((day, index) => {
          const sleepPercentage = calculateSleepPercentage(sleepData[index].hours, sleepData[index].minutes);
          const sleepTime = `${sleepData[index].hours}h ${sleepData[index].minutes}m`;
          return (
            <div className=" flex-1 flex flex-col justify-end items-center">
              <VerticalProgressBar label={sleepTime} percentage={sleepPercentage} id={`v${index}`}/>
              <span>{sleepData[index].day}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SleepCard;