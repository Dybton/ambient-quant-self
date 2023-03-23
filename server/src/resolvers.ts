import Client from "oura-cloud-api";
const accessToken = 'CWDIVW2X5NB4CPSFV73IEKMZBJUATRKW' // todo: Place this in env file
import { convertSecondsToTime, getDays } from './utilities.js';

interface SleepData {
  day: string;
  total_sleep_duration: number;
}

interface FetchSleepDataInput {
  start: string;
  end: string;
}

interface SleepDuration {
  date: string;
  duration: string;
}

interface WorkoutData {
  activity: string;
  distance: number;
}

interface FetchRunDataInput {
  start: string;
  end: string;
}

const { start, end } = getDays();
const client = new Client(accessToken);


type FetchRunDataOutput = number | null;

async function fetchRunData({ start, end }: FetchRunDataInput): Promise<FetchRunDataOutput> {
  try {
    const workout = await client.getWorkout({ start_date: start, end_date: end }); 
    const totalRunningDist = workout.data
      .filter((day: WorkoutData) => day.activity === 'running')
      .reduce((total: number, day: WorkoutData) => total + day.distance, 0);
    
    return Math.ceil(totalRunningDist) / 1000;
  } catch (error) {
    console.error('Error fetching running data:', error);
    return null;
  }
}

type FetchSleepDataOutput = SleepDuration[] | null;

async function fetchSleepData({ start, end }: FetchSleepDataInput): Promise<FetchSleepDataOutput> {
  try {
    const sleep = await client.getSleep({ start_date: start, end_date: end });
    const sleepDuration = sleep.data.map((day: SleepData) => {
      const date = day.day;
      const duration = convertSecondsToTime(day.total_sleep_duration);
      return { date, duration };
    });

    return sleepDuration;
  } catch (error) {
    console.error('Error fetching sleep data:', error);
    return null;
  }
}

export const resolvers = {
  Query: {
    sleepDuration: async () => await fetchSleepData({ start, end }),
    },
  };
  