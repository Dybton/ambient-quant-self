"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchMyGlucoseData = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const headers = {
    'accept-encoding': 'gzip',
    'cache-control': 'no-cache',
    connection: 'Keep-Alive',
    'content-type': 'application/json',
    product: 'llu.android',
    version: '4.7',
};
const api_endpoint = 'https://api-eu.libreview.io';
const email = "jakob.research@gmail.com";
const password = process.env.PASSWORD;
const setToken = async (email, password) => {
    const loginData = { email, password };
    const response = await fetch(api_endpoint + '/llu/auth/login', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(loginData)
    });
    const data = await response.json();
    const jwt_token = data['data']['authTicket']['token'];
    headers.authorization = 'Bearer ' + jwt_token;
};
const getPatientId = async () => {
    const response = await fetch(api_endpoint + '/llu/connections', {
        method: 'GET',
        headers: headers
    });
    const data = await response.json();
    const id = data['data'][0]['patientId'];
    return id;
};
const getPatientData = async (patientId) => {
    const response = await fetch(api_endpoint + "/llu/connections/" + patientId + "/graph", {
        method: 'GET',
        headers: headers
    });
    const data = await response.json();
    const graphData = data['data']['graphData'];
    const transformedGraphData = graphData.map((graphObject) => {
        return {
            timeStamp: graphObject['Timestamp'],
            type: graphObject['type'],
            value: graphObject['Value'],
            'value-in-mg-per-dl': graphObject['ValueInMgPerDl'],
            'is-high': graphObject['isHigh'],
            'is-low': graphObject['isLow'],
        };
    });
    return transformedGraphData;
};
const fetchMyGlucoseData = async () => {
    if (!password) {
        throw new Error("Password environment variable not set");
    }
    await setToken(email, password);
    const patient_id = await getPatientId();
    const data = await getPatientData(patient_id);
    console.log(data);
    return data;
};
exports.fetchMyGlucoseData = fetchMyGlucoseData;
//# sourceMappingURL=GlucoseService.js.map