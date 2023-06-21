import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// We define the GraphQL endpoint we want to use to query data
const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
