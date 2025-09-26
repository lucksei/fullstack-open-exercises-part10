import { View, Text, StyleSheet } from 'react-native';
import { format } from 'date-fns';
import theme from '../../theme';

const ReviewItem = ({ review }) => {
  const createdAt = format(new Date(review.createdAt), 'dd.MM.yyyy');

  return (
    <View style={styles.container}>
      <View style={styles.containerRating}>
        <View style={styles.ratingOutline}>
          <Text style={styles.ratingText}>{review.rating}</Text>
        </View>
      </View>
      <View style={styles.containerContent}>
        <View style={styles.containerContentHeader}>
          <Text style={styles.containerContentAuthorText}>
            {review.user.username}
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
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
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
});

export default ReviewItem;
