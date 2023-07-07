import dotenv from 'dotenv';
dotenv.config();

type Header = {
    'accept-encoding': string,
    'cache-control': string,
    connection: string,
    'content-type': string,
    product: string,
    version: string,
    authorization?: string
}

const headers : Header = {
    'accept-encoding': 'gzip',
    'cache-control': 'no-cache',
    connection: 'Keep-Alive',
    'content-type': 'application/json',
    product: 'llu.android',
    version: '4.7',
  }

type GraphObject = {
    Timestamp: string,
    type: number,
    Value: number,
    ValueInMgPerDl: number,
    isHigh: boolean,
    isLow: boolean
}

const api_endpoint = 'https://api-eu.libreview.io'
const email = "jakob.research@gmail.com"
const password = process.env.PASSWORD

const setToken = async (email : string, password : string) : Promise<void> => {

    const loginData = {email, password}
    const response = await fetch(api_endpoint + '/llu/auth/login', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(loginData)
    })
    const data = await response.json()
    const jwt_token = data['data']['authTicket']['token']
    headers.authorization = 'Bearer ' + jwt_token
}

const getPatientId = async () : Promise<string> => {
    const response = await fetch(api_endpoint + '/llu/connections', {
        method: 'GET',
        headers: headers
    })
    const data = await response.json()
    const id = data['data'][0]['patientId']
    return id
}

const getPatientData = async (patientId : string) : Promise<GraphObject[]> => {
    const response = await fetch(api_endpoint + "/llu/connections/" + patientId + "/graph", {
        method: 'GET',
        headers: headers
    })
    const data = await response.json()
    const graphData = data['data']['graphData']

    const transformedGraphData = graphData.map((graphObject : GraphObject) => {
        return {
            timeStamp: graphObject['Timestamp'],
            type: graphObject['type'],
            value: graphObject['Value'],
            'value-in-mg-per-dl': graphObject['ValueInMgPerDl'],
            'is-high': graphObject['isHigh'],
            'is-low': graphObject['isLow'],
        }
    })

    return transformedGraphData
}

export const fetchMyGlucoseData = async () : Promise<GraphObject[]> => {
    if(!password) {
        throw new Error("Password environment variable not set")
    }
    await setToken(email, password)
    const patient_id = await getPatientId()
    const data = await getPatientData(patient_id)
    console.log(data)
    return data
}