import React, { useEffect } from 'react';
import CardHeader from './CardHeader';
import ClockIcon from './Icons/ClockIcon';
import PlusIcon from './Icons/PlusIcon';
import HorizontalProgressBar from './ProgressBars/HorizontalProgressBar';
import { gql, useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client';

type DeepWork = {
  date: string;
  deepWorkHours: number;
};
  
type DeepWorkHoursData = {
  deepWorkHours: DeepWork[];
};

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

// Function takes array of Deepwork objects and returns the sum of the deepwork hours
const sumWeeklyDeepWorkHours = (data: DeepWorkHoursData): number => {
  return data.deepWorkHours.reduce((sum, item) => sum + item.deepWorkHours, 0);
};
  
const DeepWorkCard: React.FC = () => {
  const [weeklyDeepWorkHours, setWeeklyDeepWorkHours] = React.useState(0);

  const weeklyDeepworkGoal = 30;
  const { loading, error, data} = useQuery(DEEP_WORK_QUERY);

  const [updateDeepWorkHours] = useMutation(UPDATE_DEEP_WORK_HOURS, {
    onCompleted: (data) => {
      const summedUpdatedDeepworkHours = sumWeeklyDeepWorkHours({ deepWorkHours: [data.updateDeepWorkHours] });
      setWeeklyDeepWorkHours(summedUpdatedDeepworkHours);
    },
  });
    
  useEffect(() => {
    if (data) {
      setWeeklyDeepWorkHours(sumWeeklyDeepWorkHours(data));
    }
  }, [data]);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const calculatePercentage = (hours: number) => {
    return (hours / 30) * 100; //
  };

  const handleIncrement = () => {
    const newHours = weeklyDeepWorkHours + 1
    const date = new Date().toISOString().substring(0, 10);
    updateDeepWorkHours({ variables: { date, hours: newHours } }); // We pass the date and the hours 
  };

  return (
    <div className="shadow-lg w-full rounded-3xl h-3/5 xl:h-2/5 mt-14 ">
      <div className='flex-row h-2/6 w-full'>
        <CardHeader title={{ text: "Deep Work", size: 'text-2xl' }} icon={<ClockIcon/>}/>
      </div>
      <div className='flex flex-col w-full'>
        <div className='mt-2' style={{borderTop: '2px solid #E4E2E0', width: '100%'}}></div>
      </div>
      <div className='ml-8 mt-2 flex flex-col w-full h-2/5 justify-center'>
      <p className='font-semibold mr-3'>Weekly Goal</p>
        <HorizontalProgressBar percentage={calculatePercentage(weeklyDeepWorkHours)} id={'h4'} h={8} w={'5/6'}/>
        <div className="mt-2">
          <div className="flex flex-row items-center">
            
            {/* <PlusIcon onClick={handleIncrement}/> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeepWorkCard;
