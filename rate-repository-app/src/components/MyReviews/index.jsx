import { View, StyleSheet, FlatList } from 'react-native';
import { useQuery } from '@apollo/client';
import { ME } from '../../graphql/queries';
import ReviewItem from '../ReviewItem';

const MyReviews = () => {
  const { data, loading, error } = useQuery(ME, {
    fetchPolicy: 'cache-and-network',
    variables: { withReviews: true },
  });

  if (loading || error) {
    return null;
  }

  const reviewNodes = data?.me
    ? data?.me?.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <>
      <FlatList
        data={reviewNodes}
        renderItem={({ item }) => (
          <ReviewItem review={item} withRepositoryName />
        )}
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
    flexGrow: 0,
    width: '100%',
  },
  separator: {
    height: 10,
  },
});

export default MyReviews;
