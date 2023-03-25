export const getMonday = (d: Date) => {
    d = new Date(d);
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
    return new Date(d.setDate(diff));
}


export const convertSecondsToTime = (seconds: number) => {
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds % 3600) / 60);
  
    return {
      hours,
      minutes,
    };
  };


  export const getDays = (): { start: string, end: string } => {

    const lastMondayString = getDateFromWeekDay("Mon");
    const nextSundayString = getDateFromWeekDay("Sun");
  
    return {
      start: lastMondayString,
      end: nextSundayString
    };
  };
  

  export const getDateFromWeekDay =(weekday) => {
    const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const inputDayIndex = dayNames.findIndex(day => day.toLowerCase() === weekday.toLowerCase());
  
    if (inputDayIndex === -1) {
      throw new Error("Invalid weekday input. Please enter a valid weekday.");
    }
  
    const today = new Date() ;
    const currentDayIndex = today.getDay();
    const adjustedCurrentDayIndex = (currentDayIndex + 6) % 7; // Adjusts the index to treat Monday as the first day
  
    const startOfWeek = new Date(today);
    startOfWeek.setDate(startOfWeek.getDate() - adjustedCurrentDayIndex);
  
    const targetDate = new Date(startOfWeek);
    targetDate.setDate(targetDate.getDate() + inputDayIndex);
    const returnDate = targetDate.toISOString().substring(0, 10);
  
    return returnDate;
  }
  