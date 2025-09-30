import { FlatList, StyleSheet, View } from 'react-native';
import { useParams } from 'react-router-native';
import useRepository from '../../hooks/useRepository';
import RepositoryItem from '../RepositoryItem';
import ReviewItem from '../ReviewItem';

const RepositoryInfo = () => {
  const { id } = useParams();
  const { repository, loading, error, fetchMore } = useRepository({
    id,
    first: 2,
  });

  const onEndReached = () => {
    fetchMore();
  };
  if (loading || error) {
    return null;
  }

  return (
    <RepositoryInfoContainer
      repository={repository}
      reviews={repository.reviews}
      onEndReached={onEndReached}
    />
  );
};

const RepositoryInfoContainer = ({ repository, reviews, onEndReached }) => {
  const reviewNodes = reviews ? reviews.edges.map((edge) => edge.node) : [];
  return (
    <>
      <RepositoryItem repository={repository} />
      <ItemSeparator />
      <FlatList
        data={reviewNodes}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={(item) => item.id}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        ItemSeparatorComponent={ItemSeparator}
        style={styles.container}
      />
    </>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
    width: '100%',
  },
  separator: {
    height: 10,
  },
});

export default RepositoryInfo;
