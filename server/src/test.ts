import {sleepTests} from './business_logic/SleepService';

describe('reduceSleepData', () => {
    it('merges the total sleep duration for duplicate days', () => {
      const rawData = [
        {
          id: '1',
          day: '2023-03-20',
          total_sleep_duration: 3600,
          type: 'sleep',
        },
        {
          id: '2',
          day: '2023-03-21',
          total_sleep_duration: 2400,
          type: 'sleep',
        },
        {
          id: '3',
          day: '2023-03-20',
          total_sleep_duration: 1800,
          type: 'sleep',
        },
      ];
  
      const expectedSleepData = [
        {
          day: '2023-03-20',
          total_sleep_duration: 5400,
        },
        {
          day: '2023-03-21',
          total_sleep_duration: 2400,
        },
      ];
  
      const result = sleepTests.reduceSleepData(rawData);
  
      expect(result).toEqual(expectedSleepData);
    });
  });
  
  describe('mergeSleepData', () => {
    it('should merge SleepData and SleepDurationData arrays', () => {
      const sleepDataArray = [
        { day: '2023-03-20', total_sleep_duration: 22470 },
        { day: '2023-03-22', total_sleep_duration: 18000 },
      ];
    
      const sleepDurationDataArray = [
        { date: '2023-03-20', day: 'Mon', duration: { hours: 0, minutes: 0 } },
        { date: '2023-03-21', day: 'Tue', duration: { hours: 0, minutes: 0 } },
        { date: '2023-03-22', day: 'Wed', duration: { hours: 0, minutes: 0 } },
        { date: '2023-03-23', day: 'Thu', duration: { hours: 0, minutes: 0 } },
        { date: '2023-03-24', day: 'Fri', duration: { hours: 0, minutes: 0 } },
        { date: '2023-03-25', day: 'Sat', duration: { hours: 0, minutes: 0 } },
        { date: '2023-03-26', day: 'Sun', duration: { hours: 0, minutes: 0 } },
      ];
    
      const expectedResult = [
        { date: '2023-03-20', day: 'Mon', duration: { hours: 6, minutes: 14 } },
        { date: '2023-03-21', day: 'Tue', duration: { hours: 0, minutes: 0 } },
        { date: '2023-03-22', day: 'Wed', duration: { hours: 5, minutes: 0 } },
        { date: '2023-03-23', day: 'Thu', duration: { hours: 0, minutes: 0 } },
        { date: '2023-03-24', day: 'Fri', duration: { hours: 0, minutes: 0 } },
        { date: '2023-03-25', day: 'Sat', duration: { hours: 0, minutes: 0 } },
        { date: '2023-03-26', day: 'Sun', duration: { hours: 0, minutes: 0 } },
      ];
    
      const result = sleepTests.mergeSleepData(sleepDataArray, sleepDurationDataArray);
      expect(result).toEqual(expectedResult);
    });    
});