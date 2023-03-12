import Client from "oura-cloud-api";
const accessToken = 'CWDIVW2X5NB4CPSFV73IEKMZBJUATRKW'

const today = new Date();
const lastMonday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - (today.getDay() + 6) % 7);
const nextSunday = new Date(lastMonday.getFullYear(), lastMonday.getMonth(), lastMonday.getDate() + 6);

const lastMondayString = lastMonday.toISOString().substring(0, 10);
const nextSundayString = nextSunday.toISOString().substring(0, 10);

const start = lastMondayString;
const end = nextSundayString;

(async () => {
    try {
        const client = new Client(accessToken);

        const sleep = await client.getSleep({ start_date: start, end_date: end});
        const sleepDuration = sleep.data.map((day) => {
            const date = day.day;
            const duration = convertSecondsToTime(day.total_sleep_duration);
            return { date, duration };
          });
          console.log(sleepDuration);
          
        const workout = await client.getWorkout({ start_date: start, end_date: end});        
        let totalRunninDist = 0;
        workout.data.map((day) => {
            if (day.activity === 'running') {
                totalRunninDist += day.distance;
            }
        });

        totalRunninDist = Math.ceil(totalRunninDist) / 1000;
        console.log(totalRunninDist);
        
    } catch (error) {
        console.log(`Oh-no, error occured: ${error}`);
    }
})();


  const convertSecondsToTime = (seconds) => {
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds % 3600) / 60);
  
    return {
      hours,
      minutes,
    };
  };
  
  
// module.exports = { getUserInfo, getActivity, getIdealBedtime, getSleep, getHeartRate, getReadiness};
