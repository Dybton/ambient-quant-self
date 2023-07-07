process.env.TZ = 'Europe/Copenhagen';
import { getWeekStartAndEnd, getDayBefore} from './utilities';
import { startOfMonth, endOfMonth} from 'date-fns';
import { fetchSleepData } from './business_logic/SleepService';
import { fetchDeepWorkHours, updateDeepWorkHours } from './business_logic/DeepWorkService';
import { fetchRunData } from './business_logic/WorkoutService';
import { fetchTimeSpent } from './business_logic/WebsiteService';
import { fetchMyGlucoseData } from './business_logic/GlucoseService';

const { start, end } = getWeekStartAndEnd();
const startOfMonthDate = startOfMonth(new Date()).toISOString().split('T')[0];
const endOfMonthDate = endOfMonth(new Date()).toISOString().split('T')[0];

export const resolvers = {
  Query: {
    // Fetch sleep data based on the given start and end dates
    sleepDuration: async () => {
      const dayBefore = getDayBefore(start);
      return await fetchSleepData({ start: dayBefore, end });
    },

    runDistance: async () => {
      // Once both promises are resolved, return an object with the weekly and monthly distances
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

    deepWorkHours: async () => {
      return fetchDeepWorkHours();
    },

    glucoseData: async () => {
      return await fetchMyGlucoseData();
    }
  },

  Mutation: {
    // Update deep work hours for a specific date
    updateDeepWorkHours: async (_: unknown, { date, hours }: any) => {
      return await updateDeepWorkHours(_, { date, hours });
    },
  },
};

