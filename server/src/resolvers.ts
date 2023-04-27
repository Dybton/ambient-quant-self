process.env.TZ = 'Europe/Copenhagen';
import { getDays} from './utilities';
import { startOfMonth, endOfMonth } from 'date-fns';
import { fetchSleepData } from './business_logic/SleepService';
import { fetchDeepWorkHours, updateDeepWorkHours } from './business_logic/DeepWorkService';
import { fetchRunData } from './business_logic/WorkoutService';
import { fetchTimeSpent } from './business_logic/WebsiteService';

const { start, end } = getDays();
const startOfMonthDate = startOfMonth(new Date()).toISOString().split('T')[0];
const endOfMonthDate = endOfMonth(new Date()).toISOString().split('T')[0];

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
