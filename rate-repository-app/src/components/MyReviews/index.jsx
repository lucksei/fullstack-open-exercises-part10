import { View, StyleSheet, FlatList } from 'react-native';
import { useNavigate } from 'react-router-native';
import { useQuery } from '@apollo/client';
import useDeleteReview from '../../hooks/useDeleteReview';
import { ME } from '../../graphql/queries';
import ReviewItem from '../ReviewItem';

const MyReviews = () => {
  const navigate = useNavigate();
  const { deleteReview } = useDeleteReview();
  const { data, loading, error } = useQuery(ME, {
    fetchPolicy: 'cache-and-network',
    variables: { withReviews: true },
  });

  const onViewRepository = async (id) => {
    navigate(`/repository/${id}`);
  };
  if (loading || error) {
    return null;
  }

  const onDeleteReview = (id) => {
    console.log(id);
    deleteReview({ id });
  };

  const reviewNodes = data?.me
    ? data?.me?.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <>
      <FlatList
        data={reviewNodes}
        renderItem={({ item }) => (
          <ReviewItem
            review={item}
            withRepositoryName
            buttonsVisible
            onViewRepository={onViewRepository}
            onDeleteReview={onDeleteReview}
          />
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
