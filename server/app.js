var oura = require('oura')
const accessToken = 'CWDIVW2X5NB4CPSFV73IEKMZBJUATRKW'
const client = new oura.Client(accessToken)

const start = '2022-07-10'
const end = '2022-07-30'

const getUserInfo = () => client.personalInfo().then(function (user) {
    return JSON.stringify(user, null, 1)
}).catch(function(error){
console.error(error)
})

const getActivity = () => client.activity(start, end).then(function (user) {
    return JSON.stringify(user, null, 1)
}).catch(function(error){
console.error(error)
})

const getIdealBedtime = () => client.idealBedtime(start, end).then(function (user) {
    return (JSON.stringify(user, null, 1))
}).catch(function(error){
    console.error(error)
})

const getSleep = () => client.sleep(start, end).then(function (user) {
    return (JSON.stringify(user, null, 1))
}).catch(function(error){
    console.error(error)
})

const getHeartRate = () => client.heartrate(start, end).then(function (user) {
    return (JSON.stringify(user, null, 1))
}).catch(function(error){
    console.error(error)
})

const getReadiness = () => client.readiness(start, end).then(function (user) {
    return (JSON.stringify(user, null, 1))
}).catch(function(error){
    console.error(error)
})


module.exports = { getUserInfo, getActivity, getIdealBedtime, getSleep, getHeartRate, getReadiness};