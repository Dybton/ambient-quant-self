"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleepTests = exports.fetchSleepData = void 0;
const index_1 = require("../index");
const utilities_1 = require("../utilities");
// Takes an array of sleep data and reduces it to a single sleep data object per day
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
// Takes an array of sleep data and an array of sleep duration data and merges them into a single array
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
        const sleep = await index_1.ouraClient.getSleep({ start_date: start, end_date: end });
        const reducedSleepData = reduceSleepData(sleep.data);
        const mergedSleepData = mergeSleepData(reducedSleepData, sleepDurationArray);
        return mergedSleepData;
    }
    catch (error) {
        console.error('Error fetching sleep data:', error);
        return null;
    }
};
exports.fetchSleepData = fetchSleepData;
const sleepTests = {
    mergeSleepData,
    reduceSleepData
};
exports.sleepTests = sleepTests;
//# sourceMappingURL=SleepService.js.map