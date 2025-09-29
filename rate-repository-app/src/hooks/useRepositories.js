import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = ({ orderBy = 'CREATED_AT', orderDirection = 'DESC', searchKeyword = "" } = {}) => {
  const { data, error, loading, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: { orderBy, orderDirection, searchKeyword },
  });
  if (error) {
    console.error(error);
  }
  return { repositories: data?.repositories, loading, refetch };
};

export default useRepositories;
