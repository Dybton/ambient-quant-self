import Client from "oura-cloud-api";
const accessToken = 'CWDIVW2X5NB4CPSFV73IEKMZBJUATRKW';
import { convertSecondsToTime, getDays } from './utilities.js';
const { start, end } = getDays();
(async () => {
    try {
        const client = new Client(accessToken);
        const sleep = await client.getSleep({ start_date: start, end_date: end });
        const sleepDuration = sleep.data.map((day) => {
            const date = day.day;
            const duration = convertSecondsToTime(day.total_sleep_duration);
            return { date, duration };
        });
        console.log(sleepDuration);
        const workout = await client.getWorkout({ start_date: start, end_date: end });
        let totalRunninDist = 0;
        workout.data.map((day) => {
            if (day.activity === 'running') {
                totalRunninDist += day.distance;
            }
        });
        totalRunninDist = Math.ceil(totalRunninDist) / 1000;
        console.log(totalRunninDist);
    }
    catch (error) {
        console.log(`Oh-no, error occured: ${error}`);
    }
})();
// module.exports = { getUserInfo, getActivity, getIdealBedtime, getSleep, getHeartRate, getReadiness};
//# sourceMappingURL=index.js.map