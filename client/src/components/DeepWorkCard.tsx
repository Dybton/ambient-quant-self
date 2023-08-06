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
  mutation updateDeepWorkHours($date: String!, $hours: Float!) {
    updateDeepWorkHours(date: $date, hours: $hours) {
      date
      deepWorkHours
    }
  }
`;

const sumWeeklyDeepWorkHours = (data: DeepWorkHoursData): number => {
  return data.deepWorkHours.reduce((sum, item) => sum + item.deepWorkHours, 0);
};

const getDailyDeepWorkHours = (data : DeepWorkHoursData) => {
    const date = new Date().toISOString().substring(0, 10); 
    const dailyDeepWorkHourTally = data.deepWorkHours.find((item: DeepWork) => item.date === date)?.deepWorkHours || 0;
    return dailyDeepWorkHourTally;
  }

const calculatePercentage = (hours: number, goal : number) => {
  return (hours / goal) * 100;
};
  
const DeepWorkCard: React.FC = () => {
  const { loading, error, data: queryData, refetch} = useQuery(DEEP_WORK_QUERY);

  const [updateDeepWorkHours] = useMutation(UPDATE_DEEP_WORK_HOURS, {
    onCompleted: () => { 
      refetch();
    },
  });
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const weeklyDeepworkGoal = 30; 
  const dailyDeepworkGoal = 5;

  const weeklyDeepworkHours = sumWeeklyDeepWorkHours(queryData);
  const dailyDeepworkHours = getDailyDeepWorkHours(queryData);

  const handleIncrement = (increment: number) => {
    const date = new Date().toISOString().substring(0, 10);
    const dailyDeepWorkHourTally = getDailyDeepWorkHours(queryData);

    const newHours = dailyDeepWorkHourTally + increment;
    updateDeepWorkHours({ variables: { date, hours: newHours } });
  };

  const generateDeepWorkHoursLabel = (currentHours: number, goal:number) : string => {
    return `${currentHours} / ${goal} hours`
  };

  const weeklyDeepWorkHoursLabel = generateDeepWorkHoursLabel(weeklyDeepworkHours, weeklyDeepworkGoal);
  const dailyDeepWorkHoursLabel = generateDeepWorkHoursLabel(dailyDeepworkHours, dailyDeepworkGoal);

  return (
    <div className="shadow-lg w-full rounded-3xl h-3/5 xl:h-2/5 mt-14 ">
      <div className='flex-row h-2/6 w-full'>
        <CardHeader title={{ text: "Deep Work", size: "text-xl" }} icon={<ClockIcon/>}/>
      </div>
      <div className='flex mt-1 flex-col w-full'>
        <div style={{borderTop: '2px solid #E4E2E0', width: '100%'}}></div>

        <div className='ml-8 mb-2 w-full'>
          <p className='text mb-1'> Weekly goal: {weeklyDeepworkGoal} </p>
          <HorizontalProgressBar label={weeklyDeepWorkHoursLabel} percentage={calculatePercentage(weeklyDeepworkHours, weeklyDeepworkGoal)} id={'h4'} h={12} w={'5/6'}/> 
        </div>
        
        <div className='ml-8 mb-1 w-full'>
          <p className='text mb-1'> Daily goal: {dailyDeepworkGoal}</p>
          <HorizontalProgressBar label={dailyDeepWorkHoursLabel} percentage={calculatePercentage(dailyDeepworkHours, dailyDeepworkGoal)} id={'h5'} h={12} w={'5/6'}/> 
        </div>
      </div>
      <div className='ml-8 flex flex-col w-full h-1/5 justify-center'>
          <div className="flex flex-row items-center">
            
            <button onClick={() => handleIncrement(0.5)} className="hover:bg-blue-700 hover:text-white shadow-lg py-1 px-4 rounded-3xl">
              <span style={{ display: 'inline-flex', alignItems: 'center'}}><p className="mr-2">30 min</p> <PlusIcon/></span>
            </button>
            <button onClick={() => handleIncrement(0.75)} className="hover:bg-blue-700 hover:text-white shadow-lg py-1 px-4 rounded-3xl ml-4">
              <span style={{ display: 'inline-flex', alignItems: 'center'}}><p className="mr-2">45 min</p> <PlusIcon/></span>
            </button>
          </div>
        </div>
    </div>
  );
};

// Shadows - done
// Hover - done
// Handle 0.75 hours
// Edit button
// Make things dry
// Modify mutation

export default DeepWorkCard;