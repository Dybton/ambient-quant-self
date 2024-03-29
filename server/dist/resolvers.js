"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
process.env.TZ = 'Europe/Copenhagen';
const utilities_1 = require("./utilities");
const date_fns_1 = require("date-fns");
const SleepService_1 = require("./business_logic/SleepService");
const DeepWorkService_1 = require("./business_logic/DeepWorkService");
const WorkoutService_1 = require("./business_logic/WorkoutService");
const WebsiteService_1 = require("./business_logic/WebsiteService");
const GlucoseService_1 = require("./business_logic/GlucoseService");
const { start, end } = (0, utilities_1.getWeekStartAndEnd)();
const startOfMonthDate = (0, date_fns_1.startOfMonth)(new Date()).toISOString().split('T')[0];
const endOfMonthDate = (0, date_fns_1.endOfMonth)(new Date()).toISOString().split('T')[0];
exports.resolvers = {
    Query: {
        // Fetch sleep data based on the given start and end dates
        sleepDuration: async () => {
            const dayBefore = (0, utilities_1.getDayBefore)(start);
            return await (0, SleepService_1.fetchSleepData)({ start: dayBefore, end });
        },
        runDistance: async () => {
            // Once both promises are resolved, return an object with the weekly and monthly distances
            const [weeklyDistance, monthlyDistance] = await Promise.all([
                (0, WorkoutService_1.fetchRunData)({ start, end }),
                (0, WorkoutService_1.fetchRunData)({ start: startOfMonthDate, end: endOfMonthDate }),
            ]);
            return { weeklyDistance, monthlyDistance };
        },
        // Fetch time spent data from the context
        timeSpent: async (_, __, context) => {
            return await (0, WebsiteService_1.fetchTimeSpent)(context);
        },
        deepWorkHours: async () => {
            return (0, DeepWorkService_1.fetchDeepWorkHours)();
        },
        glucoseData: async () => {
            return await (0, GlucoseService_1.fetchMyGlucoseData)();
        }
    },
    Mutation: {
        // Update deep work hours for a specific date
        updateDeepWorkHours: async (_, { date, hours }) => {
            return await (0, DeepWorkService_1.updateDeepWorkHours)(_, { date, hours });
        },
    },
};
//# sourceMappingURL=resolvers.js.map