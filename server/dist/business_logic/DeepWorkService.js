"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDeepWorkHours = exports.fetchDeepWorkHours = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const utilities_1 = require("../utilities");
const databasePath = "../../../database/deepwork.json";
// Read data from the JSON file
const readData = () => {
    const jsonPath = path_1.default.join(__dirname, databasePath);
    const rawData = fs_1.default.readFileSync(jsonPath, "utf-8");
    const data = JSON.parse(rawData);
    return data;
};
// Write data to the JSON file
const writeData = (data) => {
    const jsonPath = path_1.default.join(__dirname, databasePath);
    const rawData = JSON.stringify(data, null, 2);
    fs_1.default.writeFileSync(jsonPath, rawData);
};
const isCurrentWeek = (dateString) => {
    const date = new Date(dateString);
    const { start, end } = (0, utilities_1.getWeekStartAndEnd)();
    const currentWeekStart = new Date(start);
    const currentWeekEnd = new Date(end);
    return date >= currentWeekStart && date <= currentWeekEnd;
};
const fetchDeepWorkHours = () => {
    const data = readData();
    const currentWeekData = data.filter((entry) => isCurrentWeek(entry.date));
    return currentWeekData;
};
exports.fetchDeepWorkHours = fetchDeepWorkHours;
const updateDeepWorkHours = async (_, { date, hours }) => {
    const deepWorkHoursData = readData();
    const existingDate = deepWorkHoursData.find((data) => data.date === date);
    if (existingDate) {
        existingDate.deepWorkHours = hours;
    }
    else {
        deepWorkHoursData.push({ date, deepWorkHours: hours });
    }
    writeData(deepWorkHoursData);
    return { date, deepWorkHours: existingDate ? existingDate.deepWorkHours : hours };
};
exports.updateDeepWorkHours = updateDeepWorkHours;
//# sourceMappingURL=DeepWorkService.js.map