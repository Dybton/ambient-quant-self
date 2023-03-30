"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const express_1 = __importDefault(require("express"));
const schema_js_1 = require("./schema.js");
const resolvers_js_1 = require("./resolvers.js");
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const timeSpentData = {};
const server = new apollo_server_express_1.ApolloServer({
    typeDefs: schema_js_1.typeDefs,
    resolvers: resolvers_js_1.resolvers,
    context: () => ({
        timeSpentData,
    }),
});
// Middleware
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
// Chrome API
app.post('/api/website-time', (req, res) => {
    console.log('Received data:', req.body);
    Object.assign(timeSpentData, req.body);
    res.send('Data received');
});
(async () => {
    await server.start();
    server.applyMiddleware({ app });
    const port = 4000;
    app.listen(port, () => {
        console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
    });
})();
//# sourceMappingURL=index.js.map