process.env.TZ = 'Europe/Copenhagen';
import { getWeekStartAndEnd} from './utilities';
import { startOfMonth, endOfMonth } from 'date-fns';
import { fetchSleepData } from './business_logic/SleepService';
import { fetchDeepWorkHours, updateDeepWorkHours } from './business_logic/DeepWorkService';
import { fetchRunData } from './business_logic/WorkoutService';
import { fetchTimeSpent } from './business_logic/WebsiteService';

const { start, end } = getWeekStartAndEnd();
const startOfMonthDate = startOfMonth(new Date()).toISOString().split('T')[0];
const endOfMonthDate = endOfMonth(new Date()).toISOString().split('T')[0];

export const resolvers = {
  Query: {
    // Fetch sleep data based on the given start and end dates
    sleepDuration: async () => {
      return await fetchSleepData({ start, end });
    },

    // Fetch run data for weekly and monthly distances
    runDistance: async () => {
      const [weeklyDistance, monthlyDistance] = await Promise.all([
        fetchRunData({ start, end }),
        fetchRunData({ start: startOfMonthDate, end: endOfMonthDate }),
      ]);
      return { weeklyDistance, monthlyDistance };
    },

    // Fetch time spent data from the context
    timeSpent: async (_, __, context) => {
      return await fetchTimeSpent(context);
    },

    // Fetch deep work hours data
    deepWorkHours: async () => {
      return await fetchDeepWorkHours();
    },
  },

  Mutation: {
    // Update deep work hours for a specific date
    updateDeepWorkHours: async (_, { date, hours }) => {
      return await updateDeepWorkHours(_, { date, hours });
    },
  },
};

