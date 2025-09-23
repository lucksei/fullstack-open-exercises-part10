import { useApolloClient, useMutation } from "@apollo/client";
import { AUTHENTICATE } from "../graphql/mutations";
import useAuthStorage from '../hooks/useAuthStorage';

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE)
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();

  const signIn = async ({ username, password }) => {
    const response = await mutate({
      variables: { credentials: { username, password } }
    })
    await authStorage.setAccessToken(response.data.authenticate.accessToken)
    await apolloClient.resetStore()

    return response
  };

  const signOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
  };

  return { signIn, signOut, result };
}

export default useSignIn