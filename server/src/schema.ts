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
    weeklyDistance: Float
    monthlyDistance: Float
  }

  type TimeSpent {
    website: String!
    time: Int!
  }

  type DeepWork {
    date: String!
    deepWorkHours: Float!
  }

  type GlucoseMeassurePoint {
    timeStamp: String!
    type: Int
    value: Float!
    valueInMgPerDl: Int!
    isHigh: Boolean!
    isLow: Boolean!
  }
  
  type Query {
    sleepDuration: [SleepDuration!]!
    runDistance: RunDistance!
    timeSpent: [TimeSpent!]!
    deepWorkHours: [DeepWork!]!
    glucoseData: [GlucoseMeassurePoint!]!
  }

  type Mutation {
    updateDeepWorkHours(date: String!, hours: Float!): DeepWork!
  }
`
;
