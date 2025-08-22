import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'http://localhost:8000/graphql/', // change to your backend URL
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
