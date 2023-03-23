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
async function fetchRunData({ start, end }) {
    try {
        const workout = await client.getWorkout({ start_date: start, end_date: end });
        const totalRunningDist = workout.data
            .filter((day) => day.activity === 'running')
            .reduce((total, day) => total + day.distance, 0);
        return Math.ceil(totalRunningDist) / 1000;
    }
    catch (error) {
        console.error('Error fetching running data:', error);
        return null;
    }
}
async function fetchSleepData({ start, end }) {
    try {
        const sleep = await client.getSleep({ start_date: start, end_date: end });
        const sleepDuration = sleep.data.map((day) => {
            const date = day.day;
            const duration = (0, utilities_js_1.convertSecondsToTime)(day.total_sleep_duration);
            return { date, duration };
        });
        return sleepDuration;
    }
    catch (error) {
        console.error('Error fetching sleep data:', error);
        return null;
    }
}
exports.resolvers = {
    Query: {
        sleepDuration: async () => await fetchSleepData({ start, end }),
    },
};
//# sourceMappingURL=resolvers.js.map