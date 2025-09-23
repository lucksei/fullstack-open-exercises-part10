import { ApolloClient, InMemoryCache } from '@apollo/client';
import Constants from 'expo-constants';

export const createApolloClient = () => {
  return new ApolloClient({
    uri: Constants.expoConfig.extra.apolloUri,
    cache: new InMemoryCache(),
  });
};