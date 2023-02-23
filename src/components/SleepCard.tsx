import React from 'react';
import CardHeader from './CardHeader';
import SleepIcon from './Icons/SleepIcon';
import HorizontalProgressBar from './ProgressBars/HorizontalProgressBar';
import VerticalProgressBar from './ProgressBars/VerticalProgressBar';

interface Props {}


const SleepCard: React.FC<Props> = () => {
  return (
    <div className="shadow-lg w-full rounded-3xl h-3/6 mt-14 flex-row  divide-y-[2px]">
      <div className='flex-row h-1/6 mb-8'>
        <CardHeader title={{ text: 'Sleep', size: 'text-2xl' }} icon={<SleepIcon/>}/>
      </div>
      <div className="flex h-4/6 justify-between border-2">
        <div className="border-2 flex-1 flex flex-col justify-end items-center">
          <span>Mon</span>
        </div>
        <div className="border-2 flex-1 flex flex-col justify-end items-center">
          <span>Tue</span>
        </div>
        <div className="border-2 flex-1 flex flex-col justify-end items-center">
          <span>Wed</span>
        </div>
        <div className="border-2 flex-1 flex flex-col justify-end items-center">
          <span>Thu</span>
        </div>
        <div className="border-2 flex-1 flex flex-col justify-end items-center">
          <span>Fri</span>
        </div>
        <div className="border-2 flex-1 flex flex-col justify-end items-center">
          <span>Sat</span>
        </div>
        <div className="border-2 flex-1 flex flex-col justify-end items-center">
          <span>Sun</span>
        </div>
      </div>


    </div>
  );
};

export default SleepCard;

      // <div className='flex-row h-2/6'>
      //   <CardHeader title={{ text: "KM Run", size: "text-2xl" }} icon={<Squares/>}/>
      // </div>
      // <div className='flex h-4/6'>
      //   <div className='h-full w-3/6 flex flex-col'>
      //     <div className=' w-full h-3/6'>
      //       <p className='font-bold text-5xl ml-8'> 6/30</p>
      //     </div>
      //     <div className=' w-full h-3/6'>
      //       <p className=' ml-8 font-light'> <span className='font-semibold'>20%</span>   Weekly goal</p>
      //       <p className=' ml-8 font-light'> <span className='font-semibold'>7.2%</span>   Monthly goal</p>
      //     </div>
      //   </div>
      //   <div className='h-full w-3/6'>
      //     <CircularProgressBar percentage={20}/>
      //   </div>
      // </div>