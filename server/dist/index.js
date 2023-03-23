"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const schema_js_1 = require("./schema.js");
const resolvers_js_1 = require("./resolvers.js");
const server = new apollo_server_1.ApolloServer({
    typeDefs: schema_js_1.typeDefs,
    resolvers: resolvers_js_1.resolvers,
});
server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});
// module.exports = { getUserInfo, getActivity, getIdealBedtime, getSleep, getHeartRate, getReadiness};
//# sourceMappingURL=index.js.map