import { gql } from 'apollo-server';

export const typeDefs = gql`
  type SleepDuration {
    date: String!
    duration: SleepDurationValue!
  }

  type SleepDurationValue {
    hours: Int!
    minutes: Int!
  }

  type Query {
    sleepDuration: [SleepDuration!]!
  }
`;
