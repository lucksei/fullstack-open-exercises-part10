import { NativeRouter } from 'react-router-native';
import { ApolloProvider } from '@apollo/client';
import { createApolloClient } from './src/utils/apolloClient';
import Constants from 'expo-constants';

import Main from './src/Main';

const apolloClient = createApolloClient();

export default function App() {
  console.log("Constants.expoConfig", Constants.expoConfig);
  return (
    <NativeRouter>
      <ApolloProvider client={apolloClient}>
        <Main />
      </ApolloProvider>
    </NativeRouter>
  );
}


