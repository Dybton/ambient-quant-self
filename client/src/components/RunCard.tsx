import React from 'react';
import CircularProgressBar from './ProgressBars/CircularProgressBar';
import CardHeader from './CardHeader';
import Squares from './Icons/SquaresIcon';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client';

export const RUN_DISTANCE_QUERY = gql`
  query {
    runDistance {
      distance
    }
  }
`;


const RunCard: React.FC = () => {
  // const { loading, error, data } = useQuery(RUN_DISTANCE_QUERY);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;

  // const { runDistance } = data;

  // console.log(runDistance);

  return (
    <div className="shadow-lg w-full rounded-3xl h-3/6">
      <div className='flex-row h-2/6'>
        <CardHeader title={{ text: "KM Run", size: "text-2xl" }} icon={<Squares/>}/>
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
          <CircularProgressBar percentage={20}/>
        </div>
      </div>
    </div>
  );
};

export default RunCard;
