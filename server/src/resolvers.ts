process.env.TZ = 'Europe/Copenhagen';
import { getDays} from './utilities';
import { startOfMonth, endOfMonth } from 'date-fns';
import { fetchSleepData } from './business_logic/SleepService';
import { fetchDeepWorkHours, updateDeepWorkHours } from './business_logic/DeepWorkService';
import { fetchRunData } from './business_logic/WorkoutService';

type Context = {
  timeSpentData: Record<string, number>;
};

const { start, end } = getDays();
const startOfMonthDate = startOfMonth(new Date()).toISOString().split('T')[0];
const endOfMonthDate = endOfMonth(new Date()).toISOString().split('T')[0];

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
