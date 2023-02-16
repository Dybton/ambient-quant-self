import React from 'react';
import CircularProgressBar from './ProgressBars/CircularProgressBar';

interface Props {}


const RunCard: React.FC<Props> = () => {
  return (
    <div className="shadow-lg w-full rounded-3xl h-3/6">
      <div className='flex-row h-2/6'>
        {/* Can be it's own component */}
        <div className='float-left mt-6 ml-8'> <h1 className='font-light text-2xl'>KM Run</h1></div>
        {/* Should be stored as component */}
        <div className='float-right mt-6 mr-8'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" className="w-9 h-9">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
        </svg></div>
      </div>
      <div className='flex h-4/6'>
        <div className='h-full w-3/6 flex flex-col'>
          <div className=' w-full h-3/6'>
            <p className='font-bold text-5xl ml-8'> 6/30</p>
          </div>
          <div className=' w-full h-3/6'>
            <p className=' ml-8 font-light'> <span className='font-semibold'>20%</span>   Weekly goal</p>
            <p className=' ml-8 font-light'> <span className='font-semibold'>7.2%</span>   Monthly goal</p>
          </div>
        </div>
        <div className='h-full w-3/6'>
          <CircularProgressBar/>
        </div>
      </div>
    </div>
  );
};

export default RunCard;
