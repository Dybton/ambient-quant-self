import React from 'react';
import CardHeader from './CardHeader';
import SleepIcon from './Icons/SleepIcon';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';


const SLEEP_DURATION_QUERY = gql`
query Query {
    glucoseData {
      value
      timeStamp
    }
  }
`;

const GlucoseCard: React.FC = () => {
  const { loading, error, data } = useQuery(SLEEP_DURATION_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

    const formattedGlucoseData =  data.glucoseData.map((item: any) => {
        const dateObj = new Date(item.timeStamp)
        return {value : item.value, timeStamp: dateObj.toLocaleTimeString()} 
    })

  return (
    <div className="shadow-lg w-full rounded-3xl h-3/6 mt-14 flex-row  divide-y-[2px]">
      <div className='flex-row h-1/6 mb-8'>
        <CardHeader title={{ text: 'Glucose Level', size: 'text-2xl' }} icon={<SleepIcon/>}/>
      </div>
    <div className='mt-2' style={{borderTop: '2px solid #E4E2E0', width: '100%'}}></div>
    <div>
        <LineChart width={950} height={200} data={formattedGlucoseData}>
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
            <YAxis interval={1}/>
            <XAxis dataKey="timeStamp"/>
            <Tooltip />
        </LineChart>
    </div>
    </div>
  );
};

export default GlucoseCard;