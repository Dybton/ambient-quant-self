import React, { useEffect } from 'react';
import CardHeader from './CardHeader';
import ClockIcon from './Icons/ClockIcon';
import PlusIcon from './Icons/PlusIcon';
import HorizontalProgressBar from './ProgressBars/HorizontalProgressBar';

const DeepWorkCard: React.FC = () => {

  const [deepWorkHours, setDeepWorkHours] = React.useState(0);

  const weeklyDeepworkGoal = 30;
  const calculatePercentage = (hours: number) => {
    return (hours / 30) * 100; //
  };

  const handleIncrement = () => {
    setDeepWorkHours(deepWorkHours + 1);
  };

  return (
    <div className="shadow-lg w-full rounded-3xl h-2/5 mt-14">
      <div className='flex-row h-2/6 w-full'>
        <CardHeader title={{ text: "Hours of Deep Work", size: "text-base" }} icon={<ClockIcon/>}/>
      </div>
      <div className='flex flex-col w-full'>
        <div className='ml-8 mb-2 w-full'>
          <p className='font-bold text-3xl'> {deepWorkHours}/{weeklyDeepworkGoal}</p>
        </div>
        <div className='mt-2' style={{borderTop: '2px solid #E4E2E0', width: '100%'}}></div>
      </div>
      <div className='ml-8 mt-2 flex flex-col w-full h-2/5 justify-center'>
        <HorizontalProgressBar percentage={calculatePercentage(deepWorkHours)} id={'h4'} h={12} w={'5/6'}/>
        <div className="mt-2">
          <div className="flex flex-row items-center">
            <p className='font-semibold mr-3'>Weekly Goal</p>
            <PlusIcon onClick={handleIncrement}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeepWorkCard;
