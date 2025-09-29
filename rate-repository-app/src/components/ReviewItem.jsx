import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { format } from 'date-fns';
import theme from '../theme';

const ReviewItem = ({
  review,
  withRepositoryName = false,
  buttonsVisible = false,
  onViewRepository,
  onDeleteReview,
} = {}) => {
  const createdAt = format(new Date(review.createdAt), 'dd.MM.yyyy');

  const handleDelete = () => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => onDeleteReview(review.id),
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerReview}>
        <View style={styles.containerRating}>
          <View style={styles.ratingOutline}>
            <Text style={styles.ratingText}>{review.rating}</Text>
          </View>
        </View>
        <View style={styles.containerContent}>
          <View style={styles.containerContentHeader}>
            <Text style={styles.containerContentAuthorText}>
              {withRepositoryName
                ? review.repository.fullName
                : review.user.username}
            </Text>
          </View>
          <View style={styles.containerContentDate}>
            <Text style={styles.containerContentDateText}>{createdAt}</Text>
          </View>
          <View style={styles.containerContentBody}>
            <Text style={styles.containerContentBodyText}>{review.text}</Text>
          </View>
        </View>
      </View>
      {buttonsVisible && (
        <View style={styles.containerButtons}>
          <Pressable
            onPress={() => onViewRepository(review.repository.id)}
            style={styles.buttonPrimary}
          >
            <Text style={styles.buttonText}>View repository</Text>
          </Pressable>
          <Pressable onPress={handleDelete} style={styles.buttonDanger}>
            <Text style={styles.buttonText}>Delete review</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'nowrap',
    width: '100%',
  },
  containerReview: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'flex-start',
    width: '100%',
  },
  containerRating: {
    padding: 15,
  },
  ratingOutline: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: theme.colors.primary,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingText: {
    color: theme.colors.primary,
    fontSize: theme.fontSizes.body,
    fontWeight: theme.fontWeights.bold,
  },
  containerContent: {
    flex: 1,
    flexDirection: 'column',
    paddingVertical: 10,
    paddingRight: 10,
    rowGap: 5,
  },

  containerContentAuthorText: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontWeight: theme.fontWeights.bold,
  },
  containerContentDateText: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSizes.body,
  },
  containerContentBody: {
    marginTop: 10,
  },
  containerContentBodyText: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
  },
  containerButtons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
  },
  buttonPrimary: {
    backgroundColor: theme.colors.primary,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonDanger: {
    backgroundColor: theme.colors.error,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: theme.colors.white,
    fontSize: theme.fontSizes.body,
    fontWeight: theme.fontWeights.bold,
  },
});

export default ReviewItem;
