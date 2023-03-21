import Client from "oura-cloud-api";
const accessToken = 'CWDIVW2X5NB4CPSFV73IEKMZBJUATRKW' // todo: Place this in env file
import { convertSecondsToTime, getDays } from './utilities.js';

import { ApolloServer } from 'apollo-server';
import { typeDefs } from './schema.js';
import { resolvers } from './resolvers.js';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

const { start, end } = getDays();

(async () => {
    try {
        const client = new Client(accessToken);

        const sleep = await client.getSleep({ start_date: start, end_date: end});
        const sleepDuration = sleep.data.map((day) => {
            const date = day.day;
            const duration = convertSecondsToTime(day.total_sleep_duration);
            return { date, duration };
          });
          console.log("sleepDuration", sleepDuration);
          
        const workout = await client.getWorkout({ start_date: start, end_date: end});        
        let totalRunninDist = 0;
        workout.data.map((day) => {
            if (day.activity === 'running') {
                totalRunninDist += day.distance;
            }
        });

        totalRunninDist = Math.ceil(totalRunninDist) / 1000;
        console.log("totalRunninDist", totalRunninDist);
        
    } catch (error) {
        console.log(`Oh-no, error occured: ${error}`);
    }
})();



  
// module.exports = { getUserInfo, getActivity, getIdealBedtime, getSleep, getHeartRate, getReadiness};
