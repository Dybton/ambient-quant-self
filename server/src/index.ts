import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { typeDefs } from './schema.js';
import { resolvers } from './resolvers.js';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
// const timeSpentData = {};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // context: () => ({
  //   timeSpentData,
  // }),
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Chrome API
app.post('/api/website-time', (req, res) => {
  console.log('Received data:', req.body);
  // Object.assign(timeSpentData, req.body);
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
