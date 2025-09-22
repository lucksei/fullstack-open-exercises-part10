import { ApolloClient, InMemoryCache } from '@apollo/client';
import { localAddress } from './constants';

export const createApolloClient = () => {
  return new ApolloClient({
    uri: `http://${localAddress}:4000/graphql`,
    cache: new InMemoryCache(),
  });
};