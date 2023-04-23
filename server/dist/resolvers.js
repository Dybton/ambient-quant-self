"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tests = exports.resolvers = void 0;
const oura_cloud_api_1 = __importDefault(require("oura-cloud-api"));
const accessToken = 'CWDIVW2X5NB4CPSFV73IEKMZBJUATRKW'; // todo: Place this in env file
process.env.TZ = 'Europe/Copenhagen';
const utilities_1 = require("./utilities");
const { start, end } = (0, utilities_1.getDays)();
const client = new oura_cloud_api_1.default(accessToken);
const reduceSleepData = (data) => {
    const sleepDataMap = new Map();
    for (const rawData of data) {
        const { day, total_sleep_duration } = rawData;
        if (!sleepDataMap.has(day)) {
            sleepDataMap.set(day, { day, total_sleep_duration });
        }
        else {
            const existingData = sleepDataMap.get(day);
            existingData.total_sleep_duration += total_sleep_duration;
            sleepDataMap.set(day, existingData);
        }
    }
    return Array.from(sleepDataMap.values());
};
const mergeSleepData = (sleepDataArray, sleepDurationDataArray) => {
    const mergedData = sleepDurationDataArray.map(sleepDurationData => {
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
};
const fetchSleepData = async ({ start, end }) => {
    const daysOfTheWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const sleepDurationArray = [];
    daysOfTheWeek.map(day => {
        const sleepObj = {
            date: (0, utilities_1.getDateFromWeekDay)(day),
            day: day,
            duration: { hours: 0, minutes: 0 }
        };
        sleepDurationArray.push(sleepObj);
    });
    try {
        const sleep = await client.getSleep({ start_date: start, end_date: end });
        const reducedSleepData = reduceSleepData(sleep.data);
        const mergedSleepData = mergeSleepData(reducedSleepData, sleepDurationArray);
        return mergedSleepData;
    }
    catch (error) {
        console.error('Error fetching sleep data:', error);
        return null;
    }
};
const fetchRunData = async ({ start, end }) => {
    try {
        const workout = await client.getWorkout({ start_date: start, end_date: end });
        const totalRunningDist = workout.data
            .filter((day) => day.activity === 'walking' || day.activity === 'running')
            .reduce((total, day) => total + day.distance, 0);
        console.log("workout", workout.data);
        return Number((Math.ceil(totalRunningDist) / 1000).toFixed(1));
    }
    catch (error) {
        console.error('Error fetching running data:', error);
        return null;
    }
};
const fetchTimeSpent = async (context) => {
    return Object.entries(context.timeSpentData).map(([website, time]) => ({ website, time: time }));
};
exports.resolvers = {
    Query: {
        sleepDuration: async () => await fetchSleepData({ start, end }),
        runDistance: async () => {
            const distance = await fetchRunData({ start, end });
            return { distance };
        },
        timeSpent: async (_, __, context) => {
            return await fetchTimeSpent(context);
        },
    },
};
const tests = {
    mergeSleepData,
    reduceSleepData
};
exports.tests = tests;
//# sourceMappingURL=resolvers.js.map