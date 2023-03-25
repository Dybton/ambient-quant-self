import Client from "oura-cloud-api";
const accessToken = 'CWDIVW2X5NB4CPSFV73IEKMZBJUATRKW' // todo: Place this in env file
process.env.TZ = 'Europe/Copenhagen';
import { getDays, getDateFromWeekDay} from './utilities';

// This is for the raw data from the API
interface SleepData {
  day: string;
  total_sleep_duration: number;
}

interface SleepDataInput {
  start: string;
  end: string;
}

interface WorkoutData {
  activity: string;
  distance: number;
}

interface FetchRunDataInput {
  start: string;
  end: string;
}

type SleepDurationData = {
  date: string;
  day: string;
  duration: {
    hours: number;
    minutes: number;
  };
};

type DayOfWeekString = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';

const { start, end } = getDays();
const client = new Client(accessToken);

export const reduceSleepData = (data): SleepData[] => {
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

export function mergeSleepData(sleepDataArray: SleepData[], sleepDurationDataArray: SleepDurationData[]): SleepDurationData[] {
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


async function fetchSleepData({ start, end }: SleepDataInput): Promise<SleepDurationData[] | null> {
  
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
    const sleep = await client.getSleep({ start_date: start, end_date: end });
    const reducedSleepData = reduceSleepData(sleep.data)
    const mergedSleepData = mergeSleepData(reducedSleepData, sleepDurationArray)

    return mergedSleepData;

  } catch (error) {
    console.error('Error fetching sleep data:', error);
    return null;
  }
}

async function fetchRunData({ start, end }: FetchRunDataInput): Promise<number | null> {
  try {
    const workout = await client.getWorkout({ start_date: start, end_date: end }); 
    const totalRunningDist = workout.data
      .filter((day: WorkoutData) => day.activity === 'running')
      .reduce((total: number, day: WorkoutData) => total + day.distance, 0);
    
    return Number((Math.ceil(totalRunningDist) / 1000).toFixed(1));
  } catch (error) {
    console.error('Error fetching running data:', error);
    return null;
  }
}

export const resolvers = {
  Query: {
    sleepDuration: async () => await fetchSleepData({ start, end }),
    runDistance: async () => {
      const distance = await fetchRunData({ start, end });
      return { distance };
    },
    },
  };
  