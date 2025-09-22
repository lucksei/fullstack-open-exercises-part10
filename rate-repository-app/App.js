import { NativeRouter } from 'react-router-native';
import { ApolloProvider } from '@apollo/client';

import Main from './src/Main';
import { createApolloClient } from './src/utils/apolloClient';

const apolloClient = createApolloClient();

export default function App() {
  console.log('apolloClient', apolloClient);
  return (
    <NativeRouter>
      <ApolloProvider client={apolloClient}>
        <Main />
      </ApolloProvider>
    </NativeRouter>
  );
}


