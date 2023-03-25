"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = exports.mergeSleepData = void 0;
const oura_cloud_api_1 = __importDefault(require("oura-cloud-api"));
const accessToken = 'CWDIVW2X5NB4CPSFV73IEKMZBJUATRKW'; // todo: Place this in env file
process.env.TZ = 'Europe/Copenhagen';
const utilities_1 = require("./utilities");
const { start, end } = (0, utilities_1.getDays)();
const client = new oura_cloud_api_1.default(accessToken);
const mergeSleepDuration = (sleepDuration) => {
    sleepDuration.sort((a, b) => a.date.localeCompare(b.date));
    const mergedDuration = {};
    sleepDuration.forEach(data => {
        const { date, duration } = data;
        const existingDuration = mergedDuration[date];
        if (existingDuration) {
            existingDuration.hours += duration.hours;
            existingDuration.minutes += duration.minutes;
        }
        else {
            mergedDuration[date] = { ...duration };
        }
    });
    const result = [];
    Object.entries(mergedDuration).forEach(([date, duration]) => {
        let { hours, minutes } = duration;
        hours += Math.floor(minutes / 60);
        minutes = minutes % 60;
        const day = new Date(date).toLocaleString('en-US', { weekday: 'short' });
        result.push({ date, day, duration: { hours, minutes } });
    });
    return result;
};
const mergeSleepData = (data) => {
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
exports.mergeSleepData = mergeSleepData;
async function fetchSleepData({ start, end }) {
    const daysOfTheWeek2 = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']; // create type for this
    const sleepDurationArray = [];
    daysOfTheWeek2.map(day => {
        const sleepObj = {
            date: (0, utilities_1.getDateFromWeekDay)(day),
            day: day,
            duration: { hours: 0, minutes: 0 }
        };
        sleepDurationArray.push(sleepObj);
    });
    console.log(sleepDurationArray);
    try {
        const sleep = await client.getSleep({ start_date: start, end_date: end });
        const testData1 = (0, exports.mergeSleepData)(sleep.data);
        console.log("testData1", testData1);
        sleep.data.map((night) => {
            night.day;
            console.log(night.day);
        });
        // Cont from here: Use the sleepDurationArray to merge the data from the API
        const sleepDuration = sleep.data.map((day) => {
            // Here we need to run the mergesSleepDuration function, such that we catch it while we construct the array
            const date = day.day;
            const duration = (0, utilities_1.convertSecondsToTime)(day.total_sleep_duration);
            return { date, duration };
        });
        const mergedSleepDuration = mergeSleepDuration(sleepDuration);
        return mergedSleepDuration;
    }
    catch (error) {
        console.error('Error fetching sleep data:', error);
        return null;
    }
}
async function fetchRunData({ start, end }) {
    try {
        const workout = await client.getWorkout({ start_date: start, end_date: end });
        const totalRunningDist = workout.data
            .filter((day) => day.activity === 'running')
            .reduce((total, day) => total + day.distance, 0);
        return Number((Math.ceil(totalRunningDist) / 1000).toFixed(1));
    }
    catch (error) {
        console.error('Error fetching running data:', error);
        return null;
    }
}
exports.resolvers = {
    Query: {
        sleepDuration: async () => await fetchSleepData({ start, end }),
        runDistance: async () => {
            const distance = await fetchRunData({ start, end });
            return { distance };
        },
    },
};
//# sourceMappingURL=resolvers.js.map