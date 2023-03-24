"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const oura_cloud_api_1 = __importDefault(require("oura-cloud-api"));
const accessToken = 'CWDIVW2X5NB4CPSFV73IEKMZBJUATRKW'; // todo: Place this in env file
const utilities_js_1 = require("./utilities.js");
const { start, end } = (0, utilities_js_1.getDays)();
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
    const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    daysOfWeek.forEach(dayOfWeek => {
        const date = Object.keys(mergedDuration).find(date => {
            const day = new Date(date).toLocaleString('da-DK', { weekday: 'short' }).toLowerCase();
            return day === dayOfWeek;
        });
        if (date) {
            const duration = mergedDuration[date];
            let { hours, minutes } = duration;
            hours += Math.floor(minutes / 60);
            minutes = minutes % 60;
            const day = new Date(date).toLocaleString('en-US', { weekday: 'short' });
            result.push({ date, day, duration: { hours, minutes } });
        }
        else {
            result.push({ date: '', day: dayOfWeek, duration: { hours: 0, minutes: 0 } });
        }
    });
    return result;
};
async function fetchSleepData({ start, end }) {
    try {
        const sleep = await client.getSleep({ start_date: start, end_date: end });
        const sleepDuration = sleep.data.map((day) => {
            const date = day.day;
            const duration = (0, utilities_js_1.convertSecondsToTime)(day.total_sleep_duration);
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