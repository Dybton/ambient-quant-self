"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const apollo_server_1 = require("apollo-server");
exports.typeDefs = (0, apollo_server_1.gql) `
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
    deepWorkHours: Int!
  }
  
  type Query {
    sleepDuration: [SleepDuration!]!
    runDistance: RunDistance!
    timeSpent: [TimeSpent!]!
    deepWorkHours: [DeepWork!]!
  }

  type Mutation {
    updateDeepWorkHours(date: String!, hours: Int!): DeepWork!
  }
`;
//# sourceMappingURL=schema.js.map