import { ouraClient } from "../index";

type WorkoutData = {
    activity: string;
    distance: number;
  };
  
  type FetchRunDataInput = {
    start: string;
    end: string;
  };

export const fetchRunData = async ({ start, end }: FetchRunDataInput): Promise<number | null> => {

const calculateTotalRunningDistance = (workouts: { data: WorkoutData[] }) : number => {
    const totalRunningDist = workouts.data
    .filter((day: WorkoutData) => day.activity === 'walking' || day.activity === 'running')
    .reduce((total: number, day: WorkoutData) => total + day.distance, 0);
    return totalRunningDist;
}

try {
    const workouts = await ouraClient.getWorkout({ start_date: start, end_date: end });
    const runningDistance = calculateTotalRunningDistance(workouts);
    
    return Number((Math.ceil(runningDistance) / 1000).toFixed(1));
    
} catch (error) {
    console.error('Error fetching workout data:', error);
    return null;
}
};