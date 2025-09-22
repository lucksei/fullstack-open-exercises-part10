// import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';
// import { localAddress } from '../utils/constants';

const useRepositories = () => {
  const { data, error, loading, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  });
  if (error) {
    console.error(error);
  }
  return { repositories: data?.repositories, loading, refetch };
  // const [repositories, setRepositories] = useState();
  // const [loading, setLoading] = useState(true);

  // const fetchRepositories = async () => {
  //   setLoading(true);

  //   const response = await fetch(
  //     `http://${localAddress}:5000/api/repositories`
  //   );
  //   const json = await response.json();

  //   setLoading(false);
  //   setRepositories(json);
  // };

  // useEffect(() => {
  //   fetchRepositories();
  // }, []);

  // return { repositories, loading, refetch: fetchRepositories };
};

export default useRepositories;
