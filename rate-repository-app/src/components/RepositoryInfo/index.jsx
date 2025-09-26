import { FlatList, StyleSheet, View } from 'react-native';
import { useParams } from 'react-router-native';
import useRepository from '../../hooks/useRepository';
import RepositoryItem from '../RepositoryItem';
import ReviewItem from './ReviewItem';

const RepositoryInfo = () => {
  const { id } = useParams();
  const { repository, loading, error } = useRepository(id);

  if (loading || error) {
    return null;
  }

  return (
    <RepositoryInfoContainer
      repository={repository}
      reviews={repository.reviews}
    />
  );
};

const RepositoryInfoContainer = ({ repository, reviews }) => {
  const reviewNodes = reviews ? reviews.edges.map((edge) => edge.node) : [];
  return (
    <>
      <RepositoryItem repository={repository} />
      <ItemSeparator />
      <FlatList
        data={reviewNodes}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={ItemSeparator}
        style={styles.container}
      />
    </>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  separator: {
    height: 10,
  },
});

export default RepositoryInfo;
