"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDefs = (0, apollo_server_express_1.gql) `
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
    timeSpent: TimeSpent
  }
  
`;
//# sourceMappingURL=schema.js.map