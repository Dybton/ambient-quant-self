import { ouraClient } from "../index";
import {getDateFromWeekDay} from '../utilities';

type SleepData = {
    day: string;
    total_sleep_duration: number;
};
  
type SleepDataInput = {
    start: string;
    end: string;
};  
  
type SleepDurationData = {
    date: string;
    day: string;
    duration: {
        hours: number;
        minutes: number;
};
};
  
type DayOfWeekString = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';

// Takes an array of sleep data and reduces it to a single sleep data object per day
const reduceSleepData = (data): SleepData[] => {
    const sleepDataMap = new Map<string, SleepData>();
  
    for (const rawData of data) {
      const { day, total_sleep_duration } = rawData;
  
      if (!sleepDataMap.has(day)) {
        sleepDataMap.set(day, { day, total_sleep_duration });
      } else {
        const existingData = sleepDataMap.get(day)!;
        existingData.total_sleep_duration += total_sleep_duration;
        sleepDataMap.set(day, existingData);
      }
    }
    return Array.from(sleepDataMap.values());
  };

  // Takes an array of sleep data and an array of sleep duration data and merges them into a single array
  const mergeSleepData = (sleepDataArray: SleepData[], sleepDurationDataArray: SleepDurationData[]): SleepDurationData[] => {
    const mergedData: SleepDurationData[] = sleepDurationDataArray.map(sleepDurationData => {
      const sleepData = sleepDataArray.find(sleep => sleep.day === sleepDurationData.date);
  
      const duration = sleepData
        ? {
            hours: Math.floor(sleepData.total_sleep_duration / 3600),
            minutes: Math.floor((sleepData.total_sleep_duration % 3600) / 60),
          }
        : sleepDurationData.duration;
  
      return {
        date: sleepDurationData.date,
        day: sleepDurationData.day,
        duration,
      };
    });
  
    return mergedData;
  }

  export const fetchSleepData = async ({ start, end }: SleepDataInput): Promise<SleepDurationData[] | null> => {  
    const daysOfTheWeek : DayOfWeekString[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const sleepDurationArray = [];
  
    daysOfTheWeek.map(day => {
      const sleepObj : SleepDurationData = {
        date: getDateFromWeekDay(day),
        day: day,
        duration: { hours: 0, minutes: 0 }
      }
      sleepDurationArray.push(sleepObj)
    })

  try {
    const sleep = await ouraClient.getSleep({ start_date: start, end_date: end });
    const reducedSleepData = reduceSleepData(sleep.data)
    const mergedSleepData = mergeSleepData(reducedSleepData, sleepDurationArray)

    return mergedSleepData;

  } catch (error) {
    console.error('Error fetching sleep data:', error);
    return null;
  }
}

 
const sleepTests = {
    mergeSleepData,
    reduceSleepData
  };

  export { sleepTests };