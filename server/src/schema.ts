import { gql } from 'apollo-server-express';

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
    9gag_com: Int
    facebook_com: Int
    twitter_com: Int
  }

  type Query {
    sleepDuration: [SleepDuration!]!
    runDistance: RunDistance!
  }
  
`;
