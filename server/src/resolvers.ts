import Client from "oura-cloud-api";
const accessToken = 'CWDIVW2X5NB4CPSFV73IEKMZBJUATRKW' // todo: Place this in env file
process.env.TZ = 'Europe/Copenhagen';
import { getDays, getDateFromWeekDay} from './utilities';
import fs from 'fs';
import path from 'path';
import { startOfMonth, endOfMonth, startOfISOWeek } from 'date-fns';

// This is for the raw data from the API
type SleepData = {
  day: string;
  total_sleep_duration: number;
};

type SleepDataInput = {
  start: string;
  end: string;
};

type WorkoutData = {
  activity: string;
  distance: number;
};

type FetchRunDataInput = {
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

type Context = {
  timeSpentData: Record<string, number>;
};


type DayOfWeekString = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';

const { start, end } = getDays();
const startOfMonthDate = startOfMonth(new Date()).toISOString().split('T')[0];
const endOfMonthDate = endOfMonth(new Date()).toISOString().split('T')[0];

const client = new Client(accessToken);

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


const fetchSleepData = async ({ start, end }: SleepDataInput): Promise<SleepDurationData[] | null> => {
  
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

// Read data from the JSON file
const readData = () => {
  // const jsonPath = path.join(__dirname, '..', 'src', 'deepwork.json');
  const jsonPath = path.join(__dirname, "..", "..", "database", "deepwork.json");
  const rawData = fs.readFileSync(jsonPath, "utf-8")
  const data = JSON.parse(rawData);
  return data;
};

// Write data to the JSON file
const writeData = (data : string) => {
  const jsonPath = path.join(__dirname, "..", "..", "database", "deepwork.json");
  const rawData = JSON.stringify(data, null, 2);
  fs.writeFileSync(jsonPath, rawData);
};

const isCurrentWeek = (dateString : string) => {
  const date = new Date(dateString);
  const { start, end } = getDays();

  const currentWeekStart = new Date(start);
  const currentWeekEnd = new Date(end);

  return date >= currentWeekStart && date <= currentWeekEnd;
};

const fetchtDeepWorkHours = () => {
  const data = readData();
  const currentWeekData = data.filter((entry) => isCurrentWeek(entry.date));

  return currentWeekData;
};

const updateDeepWorkHours = async (_, { date, hours }) => {
  const deepWorkHoursData = readData();

  const existingData = deepWorkHoursData.find((data) => data.date === date);
  if (existingData) { 
    existingData.deepWorkHours = hours;
  } else {
    deepWorkHoursData.push({ date, deepWorkHours: hours });
  }

  writeData(deepWorkHoursData);

  return { date, deepWorkHours: existingData ? existingData.deepWorkHours : hours };
};

const fetchRunData = async ({ start, end }: FetchRunDataInput): Promise<number | null> => {

  const calculateTotalRunningDistance = (workouts: { data: WorkoutData[] }) : number => {
    const totalRunningDist = workouts.data
      .filter((day: WorkoutData) => day.activity === 'walking' || day.activity === 'running')
      .reduce((total: number, day: WorkoutData) => total + day.distance, 0);
    return totalRunningDist;
  }
  
  try {
    const workouts = await client.getWorkout({ start_date: start, end_date: end });
    const runningDistance = calculateTotalRunningDistance(workouts);
    
    return Number((Math.ceil(runningDistance) / 1000).toFixed(1));
    
  } catch (error) {
    console.error('Error fetching workout data:', error);
    return null;
  }
};

const fetchTimeSpent = async (context: Context): Promise<{ website: string; time: number }[]> => {
  try {

    console.log('fetchTimeSpent context:', context)

    if (!context || !context.timeSpentData) {
      console.error('Error: Invalid context or missing timeSpentData');
      return [];
    }

    const result = Object.entries(context.timeSpentData).map(([website, time]) => {
      if (typeof time !== 'number') {
        console.warn(`Warning: Time is not a number for ${website}, using 0 as default value`);
        return { website, time: 0 };
      }
      return { website, time };
    });

    console.log('fetchTimeSpent result:', result);
    return result;
  } catch (error) {
    console.error('Error in fetchTimeSpent:', error);
    return [];
  }
};

export const resolvers = {
  Query: {
    sleepDuration: async () => await fetchSleepData({ start, end }),

    runDistance: async () => {
      const [weeklyDistance, monthlyDistance] = await Promise.all([
        fetchRunData({ start, end }),
        fetchRunData({ start: startOfMonthDate, end: endOfMonthDate }),
      ])
      return { weeklyDistance, monthlyDistance};
    },

    timeSpent: async (_, __, context) => {
      return await fetchTimeSpent(context);
    },

    deepWorkHours: () =>  fetchtDeepWorkHours()
    },

  Mutation: {
  updateDeepWorkHours: (_, { date, hours }) => updateDeepWorkHours(_, { date, hours }),
}

  };
  
  const tests = {
    mergeSleepData,
    reduceSleepData
  };

  export { tests };