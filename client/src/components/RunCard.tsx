import React from 'react';
import CircularProgressBar from './ProgressBars/CircularProgressBar';
import CardHeader from './CardHeader';
import Squares from './Icons/SquaresIcon';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client';

export const RUN_DISTANCE_QUERY = gql`
  query {
    runDistance {
      weeklyDistance
      monthlyDistance
    }
  }
`;

const RunCard: React.FC = () => {
  const { loading, error, data } = useQuery(RUN_DISTANCE_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { weeklyDistance, monthlyDistance } = data.runDistance;

  const weeklyRunGoal = 10;
  const monthlyGoal = weeklyRunGoal * 4;

  const weeklyPercentage = Number((weeklyDistance / weeklyRunGoal * 100).toFixed(1));
  const monthlyPercentage = Number((monthlyDistance / monthlyGoal * 100).toFixed(1));

  return (
    <div className="shadow-lg w-full rounded-3xl h-3/6">
      <div className='flex-row h-2/6'>
        <CardHeader title={{ text: "KM Run", size: "text-2xl" }} icon={<Squares/>}/>
      </div>
      <div className='flex h-4/6'>
      <div className='h-full w-3/6 flex flex-col'>
        <div className='w-full h-3/6 flex items-center'>
          <p className='font-bold text-5xl ml-8'> {weeklyDistance}/{weeklyRunGoal}</p>
        </div>
        <div className='w-full h-3/6 flex flex-col justify-center'>
          <div className='flex items-center ml-8'>
            <p className='font-light'><span className='font-semibold'>{weeklyPercentage}%</span> Weekly goal</p>
          </div>
          <div className='flex items-center ml-8'>
            <p className='font-light'><span className='font-semibold'>{monthlyPercentage}%</span> Monthly goal</p>
          </div>
        </div>
      </div>

        <div className='h-full w-3/6'>
          <CircularProgressBar percentage={weeklyPercentage}/>
        </div>
      </div>
    </div>
  );
};

export default RunCard;
