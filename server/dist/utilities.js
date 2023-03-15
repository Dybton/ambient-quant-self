export const getMonday = (d) => {
    d = new Date(d);
    var day = d.getDay(), diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
    return new Date(d.setDate(diff));
};
export const convertSecondsToTime = (seconds) => {
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds % 3600) / 60);
    return {
        hours,
        minutes,
    };
};
export const getDays = () => {
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
//# sourceMappingURL=utilities.js.map