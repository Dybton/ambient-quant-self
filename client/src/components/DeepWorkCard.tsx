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

  // This needs to be a state
  const weeklyDeepworkGoal = 30; 
  const calculatePercentage = (hours: number) => {
    return (hours / 30) * 100; //
  };

  const handleIncrement = () => {
    const newHours = weeklyDeepWorkHours + 1;
    const date = new Date().toISOString().substring(0, 10);
    updateDeepWorkHours({ variables: { date, hours: newHours } }); // We pass the date and the hours 
  };

  return (
    <div className="shadow-lg w-full rounded-3xl h-3/5 xl:h-2/5 mt-14 ">
      <div className='flex-row h-2/6 w-full'>
        <CardHeader title={{ text: "Deep Work", size: "text-xl" }} icon={<ClockIcon/>}/>
      </div>
      <div className='flex mt-1 flex-col w-full'>
        <div style={{borderTop: '2px solid #E4E2E0', width: '100%'}}></div>

        {/* Make these into components */}
        <div className='ml-8 mb-2 w-full'>
          <p className='text mb-1'> Weekly goal: {weeklyDeepworkGoal} </p>
          <HorizontalProgressBar percentage={calculatePercentage(weeklyDeepWorkHours)} id={'h4'} h={12} w={'5/6'}/> 
        </div>
        <div className='ml-8 mb-1 w-full'>
          <p className='text mb-1'> Daily goal: 5</p>
          <HorizontalProgressBar percentage={calculatePercentage(weeklyDeepWorkHours)} id={'h5'} h={12} w={'5/6'}/> 
        </div>
      </div>
      <div className='ml-8 flex flex-col w-full h-1/5 justify-center'>
          <div className="flex flex-row items-center">
            
            {/* Make this into component */}
            <button onClick={handleIncrement} className="hover:bg-blue-700 hover:text-white shadow-lg py-1 px-4 rounded-3xl">
              <span style={{ display: 'inline-flex', alignItems: 'center'}}><p className="mr-2">30 min</p> <PlusIcon/></span>
            </button>
            <button onClick={handleIncrement} className="hover:bg-blue-700 hover:text-white shadow-lg py-1 px-4 rounded-3xl">
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