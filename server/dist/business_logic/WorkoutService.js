"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchRunData = void 0;
const index_1 = require("../index");
const fetchRunData = async ({ start, end }) => {
    const calculateTotalRunningDistance = (workouts) => {
        const totalRunningDist = workouts.data
            .filter((day) => day.activity === 'walking' || day.activity === 'running')
            .reduce((total, day) => total + day.distance, 0);
        return totalRunningDist;
    };
    try {
        const workouts = await index_1.ouraClient.getWorkout({ start_date: start, end_date: end });
        const runningDistance = calculateTotalRunningDistance(workouts);
        return Number((Math.ceil(runningDistance) / 1000).toFixed(1));
    }
    catch (error) {
        console.error('Error fetching workout data:', error);
        return null;
    }
};
exports.fetchRunData = fetchRunData;
//# sourceMappingURL=WorkoutService.js.map