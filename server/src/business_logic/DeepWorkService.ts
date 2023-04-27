import fs from 'fs';
import path from 'path';
import { getDays } from '../utilities';

const databasePath = "../../../database/deepwork.json";

// Read data from the JSON file
const readData = () => {
    const jsonPath = path.join(__dirname, databasePath);
    const rawData = fs.readFileSync(jsonPath, "utf-8")
    const data = JSON.parse(rawData);
    return data;
  };
  
  // Write data to the JSON file
  const writeData = (data : string) => {
    const jsonPath = path.join(__dirname, databasePath);
    const rawData = JSON.stringify(data, null, 2);
    fs.writeFileSync(jsonPath, rawData);
  };

  const isCurrentWeek = (dateString : string) => {
    const date = new Date(dateString);
    const { start, end } = getDays();
  
    const currentWeekStart = new Date(start);
    const currentWeekEnd = new Date(end);
  
    return date >= currentWeekStart && date <= currentWeekEnd;
  };

export const fetchDeepWorkHours = () => {
    const data = readData();
    const currentWeekData = data.filter((entry) => isCurrentWeek(entry.date));
    return currentWeekData;
};

export const updateDeepWorkHours = async (_, { date, hours }) => {
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

