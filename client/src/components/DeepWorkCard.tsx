import React, { useEffect } from 'react';
import CardHeader from './CardHeader';
import ClockIcon from './Icons/ClockIcon';
import PlusIcon from './Icons/PlusIcon';
import HorizontalProgressBar from './ProgressBars/HorizontalProgressBar';
import { gql, useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client';

interface DeepWork {
  __typename: string;
  date: string;
  deepWorkHours: number;
}

interface DeepWorkHoursData {
  deepWorkHours: DeepWork[];
}

export const DEEP_WORK_QUERY = gql`
  query {
    deepWorkHours {
      date
      deepWorkHours
    }
  }
`;

const UPDATE_DEEP_WORK_HOURS = gql`
  mutation updateDeepWorkHours($date: String!, $hours: Int!) {
    updateDeepWorkHours(date: $date, hours: $hours) {
      date
      deepWorkHours
    }
  }
`;


const sumWeeklyDeepWorkHours = (data: DeepWorkHoursData): number => {
  return data.deepWorkHours.reduce((sum, item) => sum + item.deepWorkHours, 0);
};
  
const DeepWorkCard: React.FC = () => {
  const [weeklyDeepWorkHours, setWeeklyDeepWorkHours] = React.useState(0);

  const { loading, error, data } = useQuery(DEEP_WORK_QUERY);

  const [updateDeepWorkHours] = useMutation(UPDATE_DEEP_WORK_HOURS, {
    onCompleted: (data) => {
      // Update the local state with the new data
      setWeeklyDeepWorkHours(sumWeeklyDeepWorkHours({ deepWorkHours: [data.updateDeepWorkHours] }));
    },
  });

  useEffect(() => {
    if (data) {
      setWeeklyDeepWorkHours(sumWeeklyDeepWorkHours(data));
    }
  }, [data]);
    
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const weeklyDeepworkGoal = 30;
  const calculatePercentage = (hours: number) => {
    return (hours / 30) * 100; //
  };

  const handleIncrement = () => {
    const newHours = weeklyDeepWorkHours + 1;
    const date = new Date().toISOString().substring(0, 10);
    updateDeepWorkHours({ variables: { date, hours: newHours } });
  };

  return (
    <div className="shadow-lg w-full rounded-3xl h-2/5 mt-14">
      <div className='flex-row h-2/6 w-full'>
        <CardHeader title={{ text: "Hours of Deep Work", size: "text-base" }} icon={<ClockIcon/>}/>
      </div>
      <div className='flex flex-col w-full'>
        <div className='ml-8 mb-2 w-full'>
          <p className='font-bold text-3xl'> {weeklyDeepWorkHours}/{weeklyDeepworkGoal}</p>
        </div>
        <div className='mt-2' style={{borderTop: '2px solid #E4E2E0', width: '100%'}}></div>
      </div>
      <div className='ml-8 mt-2 flex flex-col w-full h-2/5 justify-center'>
        <HorizontalProgressBar percentage={calculatePercentage(weeklyDeepWorkHours)} id={'h4'} h={12} w={'5/6'}/>
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
