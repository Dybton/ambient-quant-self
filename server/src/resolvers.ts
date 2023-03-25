import Client from "oura-cloud-api";
const accessToken = 'CWDIVW2X5NB4CPSFV73IEKMZBJUATRKW' // todo: Place this in env file
process.env.TZ = 'Europe/Copenhagen';
import { convertSecondsToTime, getDays, getDateFromWeekDay} from './utilities';

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

const { start, end } = getDays();
const client = new Client(accessToken);

const mergeSleepDuration = (sleepDuration: SleepDurationData[]): SleepDurationData[] => {
  sleepDuration.sort((a, b) => a.date.localeCompare(b.date));

  const mergedDuration: Record<string, {hours: number, minutes: number}> = {};
  sleepDuration.forEach(data => {
    const {date, duration} = data;
    const existingDuration = mergedDuration[date];
    if (existingDuration) {
      existingDuration.hours += duration.hours;
      existingDuration.minutes += duration.minutes;
    } else {
      mergedDuration[date] = {...duration};
    }
  });

  const result: SleepDurationData[] = [];
  Object.entries(mergedDuration).forEach(([date, duration]) => {
    let {hours, minutes} = duration;
    hours += Math.floor(minutes / 60);
    minutes = minutes % 60;

    const day = new Date(date).toLocaleString('en-US', { weekday: 'short' });
    
    result.push({date, day, duration: {hours, minutes}});
  });

  return result;
};


export const mergeSleepData = (data): SleepData[] => {
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


async function fetchSleepData({ start, end }: SleepDataInput): Promise<SleepDurationData[] | null> {
  
    const daysOfTheWeek2 = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']; // create type for this
    const sleepDurationArray = [];
  
    daysOfTheWeek2.map(day => {
      const sleepObj : SleepDurationData = {
        date: getDateFromWeekDay(day),
        day: day,
        duration: { hours: 0, minutes: 0 }
      }
      sleepDurationArray.push(sleepObj)
    })

    console.log(sleepDurationArray)

  
  

  try {
    const sleep = await client.getSleep({ start_date: start, end_date: end });
    console.log(sleep.data)
    
    sleep.data.map((night: SleepData) => {
      night.day
      console.log(night.day)
    })
    // Cont from here: Use the sleepDurationArray to merge the data from the API
    
    const sleepDuration = sleep.data.map((day: SleepData) => {
      // Here we need to run the mergesSleepDuration function, such that we catch it while we construct the array
      const date = day.day;
      const duration = convertSecondsToTime(day.total_sleep_duration);
      return { date, duration };
    });

    const mergedSleepDuration = mergeSleepDuration(sleepDuration);

    return mergedSleepDuration;
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
  