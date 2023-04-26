import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';

const app = express();
const port = 4000;

// Global variable to store time spent data
let timeSpentData = {};

app.use(cors());
app.use(express.json());

// Route to handle incoming POST requests from the Chrome extension
app.post('/api/website-time', (req, res) => {
  console.log('Received data from Chrome extension:', req.body);
  timeSpentData = req.body;
  console.log('Updated timeSpentData:', timeSpentData);
  res.send('Data received');
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({ timeSpentData }),
});

(async () => {
  await server.start();
  server.applyMiddleware({ app });

  app.listen(port, () => {
    console.log('Initial timeSpentData:', timeSpentData);
    console.log(`Server listening at http://localhost:${port}${server.graphqlPath}`);
  });  
})();
