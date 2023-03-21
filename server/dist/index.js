"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const oura_cloud_api_1 = __importDefault(require("oura-cloud-api"));
const accessToken = 'CWDIVW2X5NB4CPSFV73IEKMZBJUATRKW'; // todo: Place this in env file
const utilities_js_1 = require("./utilities.js");
const apollo_server_1 = require("apollo-server");
const schema_js_1 = require("./schema.js");
const resolvers_js_1 = require("./resolvers.js");
const server = new apollo_server_1.ApolloServer({
    typeDefs: schema_js_1.typeDefs,
    resolvers: resolvers_js_1.resolvers,
});
server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});
const { start, end } = (0, utilities_js_1.getDays)();
(async () => {
    try {
        const client = new oura_cloud_api_1.default(accessToken);
        const sleep = await client.getSleep({ start_date: start, end_date: end });
        const sleepDuration = sleep.data.map((day) => {
            const date = day.day;
            const duration = (0, utilities_js_1.convertSecondsToTime)(day.total_sleep_duration);
            return { date, duration };
        });
        console.log("sleepDuration", sleepDuration);
        const workout = await client.getWorkout({ start_date: start, end_date: end });
        let totalRunninDist = 0;
        workout.data.map((day) => {
            if (day.activity === 'running') {
                totalRunninDist += day.distance;
            }
        });
        totalRunninDist = Math.ceil(totalRunninDist) / 1000;
        console.log("totalRunninDist", totalRunninDist);
    }
    catch (error) {
        console.log(`Oh-no, error occured: ${error}`);
    }
})();
// module.exports = { getUserInfo, getActivity, getIdealBedtime, getSleep, getHeartRate, getReadiness};
//# sourceMappingURL=index.js.map