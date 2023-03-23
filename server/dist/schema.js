"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const apollo_server_1 = require("apollo-server");
exports.typeDefs = (0, apollo_server_1.gql) `
  type SleepDuration {
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

  type Query {
    sleepDuration: [SleepDuration!]!
    runDistance: RunDistance!
  }
`;
//# sourceMappingURL=schema.js.map