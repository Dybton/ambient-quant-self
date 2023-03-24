import { ApolloClient, InMemoryCache } from '@apollo/client';

// This is our configuration file for the Apollo Client

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // Replace with the URL of your GraphQL server
  cache: new InMemoryCache(),
});

export default client;
