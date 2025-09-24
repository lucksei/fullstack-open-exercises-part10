import { useParams } from 'react-router-native';
import useRepository from '../hooks/useRepository';
import RepositoryItem from './RepositoryItem';

const Repository = () => {
  const { id } = useParams();
  const { repository, loading, error } = useRepository(id);

  if (loading || error) {
    return null;
  }

  return <RepositoryItem item={repository} />;
};

export default Repository;