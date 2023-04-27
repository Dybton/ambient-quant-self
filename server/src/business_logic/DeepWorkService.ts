import fs from 'fs';
import path from 'path';
import { getWeekStartAndEnd } from '../utilities';

type DeepWorkEntry = {
  date: string;
  deepWorkHours: number;
};

const databasePath = "../../../database/deepwork.json";

// Read data from the JSON file
const readData = (): DeepWorkEntry[] => {
  const jsonPath = path.join(__dirname, databasePath);
  const rawData = fs.readFileSync(jsonPath, "utf-8");
  const data: DeepWorkEntry[] = JSON.parse(rawData);
  return data;
};

// Write data to the JSON file
const writeData = (data: DeepWorkEntry[]): void => {
  const jsonPath = path.join(__dirname, databasePath);
  const rawData = JSON.stringify(data, null, 2);
  fs.writeFileSync(jsonPath, rawData);
};

const isCurrentWeek = (dateString: string): boolean => {
  const date = new Date(dateString);
  const { start, end } = getWeekStartAndEnd();

  const currentWeekStart = new Date(start);
  const currentWeekEnd = new Date(end);

  return date >= currentWeekStart && date <= currentWeekEnd;
};

export const fetchDeepWorkHours = (): DeepWorkEntry[] => {
  const data = readData();
  const currentWeekData = data.filter((entry) => isCurrentWeek(entry.date));
  return currentWeekData;
};

export const updateDeepWorkHours = async (_: unknown, { date, hours }: { date: string; hours: number }
): Promise<DeepWorkEntry> => {
  const deepWorkHoursData = readData();

  const existingData = deepWorkHoursData.find((data) => data.date === date);
  if (existingData) {
    existingData.deepWorkHours = hours;
  } else {
    deepWorkHoursData.push({ date, deepWorkHours: hours });
  }

  writeData(deepWorkHoursData);

  return { date, deepWorkHours: existingData ? existingData.deepWorkHours : hours };
};
