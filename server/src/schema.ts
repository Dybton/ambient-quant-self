import { gql } from 'apollo-server';

export const typeDefs = gql`
  type SleepDuration {
    day: String!
    date: String!
    duration: SleepDurationValue!
  }

  type SleepDurationValue {
    hours: Int!
    minutes: Int!
  }

  type RunDistance {
    distance: Float
  }

  type TimeSpent {
    website: String!
    time: Int!
  }

  type DeepWork {
    date: String!
    deepWorkHours: Int!
  }

  type Query {
    sleepDuration: [SleepDuration!]!
    runDistance: RunDistance!
    timeSpent: [TimeSpent!]!
    deepWorkHours: [DeepWork!]!
  }
`;
