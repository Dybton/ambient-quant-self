export const resolvers = {
    Query: {
      sleepDuration: () => {
        return [
          {
            date: '2023-03-21',
            duration: {
              hours: 0,
              minutes: 1,
            },
          },
          {
            date: '2023-03-21',
            duration: {
              hours: 6,
              minutes: 13,
            },
          },
        ];
      },
    },
  };
  