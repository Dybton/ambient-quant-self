"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDays = exports.convertSecondsToTime = exports.getMonday = void 0;
const getMonday = (d) => {
    d = new Date(d);
    var day = d.getDay(), diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
    return new Date(d.setDate(diff));
};
exports.getMonday = getMonday;
const convertSecondsToTime = (seconds) => {
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds % 3600) / 60);
    return {
        hours,
        minutes,
    };
};
exports.convertSecondsToTime = convertSecondsToTime;
const getDays = () => {
    const today = new Date();
    const lastMonday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - (today.getDay() + 6) % 7);
    const nextSunday = new Date(lastMonday.getFullYear(), lastMonday.getMonth(), lastMonday.getDate() + 6);
    const lastMondayString = lastMonday.toISOString().substring(0, 10);
    const nextSundayString = nextSunday.toISOString().substring(0, 10);
    return {
        start: lastMondayString,
        end: nextSundayString
    };
};
exports.getDays = getDays;
//# sourceMappingURL=utilities.js.map