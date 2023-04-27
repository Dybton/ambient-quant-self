
export const fetchTimeSpent = async (context): Promise<{ website: string; time: number }[]> => {
    try {
  
      console.log('fetchTimeSpent context:', context)
  
      if (!context || !context.timeSpentData) {
        console.error('Error: Invalid context or missing timeSpentData');
        return [];
      }
  
      const result = Object.entries(context.timeSpentData).map(([website, time]) => {
        if (typeof time !== 'number') {
          console.warn(`Warning: Time is not a number for ${website}, using 0 as default value`);
          return { website, time: 0 };
        }
        return { website, time };
      });
  
      console.log('fetchTimeSpent result:', result);
      return result;
    } catch (error) {
      console.error('Error in fetchTimeSpent:', error);
      return [];
    }
  };