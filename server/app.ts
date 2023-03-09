
const Client = require("oura-cloud-api");
const accessToken = 'CWDIVW2X5NB4CPSFV73IEKMZBJUATRKW'

// These should dynamically change depending on the date 
const start = '2023-03-06';
const end = '2023-03-12';


(async () => {
    try {
        const client = new Client(accessToken);

        const userInfo  = await client.GetPersonalInfo();
        const sleep = await client.getSleep({ start_date: start, end_date: end});
        const workout = await client.getWorkout({ start_date: start, end_date: end}); // register next run and see if it pops up

    } catch (error) {
        console.log(`Oh-no, error occured: ${error}`);
    }
})();


// module.exports = { getUserInfo, getActivity, getIdealBedtime, getSleep, getHeartRate, getReadiness};