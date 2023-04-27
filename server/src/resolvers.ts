process.env.TZ = 'Europe/Copenhagen';
import { getDays, getDateFromWeekDay} from './utilities';
import fs from 'fs';
import path from 'path';
import { startOfMonth, endOfMonth } from 'date-fns';
import { ouraClient } from "./index";
import { fetchSleepData } from './business_logic/SleepService';

type WorkoutData = {
  activity: string;
  distance: number;
};

type FetchRunDataInput = {
  start: string;
  end: string;
};


type Context = {
  timeSpentData: Record<string, number>;
};

const { start, end } = getDays();
const startOfMonthDate = startOfMonth(new Date()).toISOString().split('T')[0];
const endOfMonthDate = endOfMonth(new Date()).toISOString().split('T')[0];


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
    const workouts = await ouraClient.getWorkout({ start_date: start, end_date: end });
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
