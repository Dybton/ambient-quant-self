

  export const getWeekStartAndEnd = (): { start: string, end: string } => {

    const lastMondayString = getDateFromWeekDay("Mon");
    const nextSundayString = getDateFromWeekDay("Sun");
  
    return {
      start: lastMondayString,
      end: nextSundayString
    };
  };
  

  export const getDateFromWeekDay = (weekday : string) => {
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

  export const getDayBefore = (date : string) => {
    const dayBefore = new Date(date)
    dayBefore.setDate(dayBefore.getDate() - 1);
    const formattedDayBefore = dayBefore.toISOString().split('T')[0];
    return formattedDayBefore;
  }
  