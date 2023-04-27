process.env.TZ = 'Europe/Copenhagen';
import { getDays} from './utilities';
import { startOfMonth, endOfMonth } from 'date-fns';
import { ouraClient } from "./index";
import { fetchSleepData } from './business_logic/SleepService';
import { fetchDeepWorkHours, updateDeepWorkHours } from './business_logic/DeepWorkService';

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

    deepWorkHours: () =>  fetchDeepWorkHours()
    },

  Mutation: {
  updateDeepWorkHours: (_, { date, hours }) => updateDeepWorkHours(_, { date, hours }),
}

  };
