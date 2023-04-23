"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const cors_1 = __importDefault(require("cors"));
const schema_1 = require("./schema");
const resolvers_1 = require("./resolvers");
const app = (0, express_1.default)();
const port = 4000;
// Global variable to store time spent data
let timeSpentData = {};
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Route to handle incoming POST requests from the Chrome extension
app.post('/api/website-time', (req, res) => {
    timeSpentData = req.body;
    res.send('Data received');
});
const server = new apollo_server_express_1.ApolloServer({
    typeDefs: schema_1.typeDefs,
    resolvers: resolvers_1.resolvers,
    context: () => ({ timeSpentData }),
});
(async () => {
    await server.start();
    server.applyMiddleware({ app });
    app.listen(port, () => {
        console.log(`Server listening at http://localhost:${port}${server.graphqlPath}`);
    });
})();
//# sourceMappingURL=index.js.map