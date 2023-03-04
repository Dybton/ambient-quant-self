import React from 'react';
import CardHeader from './CardHeader';
import ClockIcon from './Icons/ClockIcon';
import HorizontalProgressBar from './ProgressBars/HorizontalProgressBar';

interface Props {}  


const DeepWorkCard: React.FC<Props> = () => {
  return (
    <div className="shadow-lg w-full rounded-3xl h-2/5 mt-14">
      <div className='flex-row h-2/6 w-full'>
        <CardHeader title={{ text: "Hours of Deep Work", size: "text-base" }} icon={<ClockIcon/>}/>
      </div>
      <div className='flex flex-col w-full'>
        <div className='ml-8 mb-2 w-full'>
          <p className='font-bold text-3xl'> 22.5/30</p>
        </div>
        <div className='mt-2' style={{borderTop: '2px solid #E4E2E0', width: '100%'}}></div>
      </div>
      <div className='ml-8 mt-2 flex flex-col w-full h-2/5 justify-center'>
        <HorizontalProgressBar percentage={75} id={'h4'} h={12} w={'5/6'}/>
        <p className=' mt-2 font-semibold'>Weekly Goal</p>
      </div>
    </div>
  );
};


export default DeepWorkCard;
