import { View, Text, Image, StyleSheet } from 'react-native';
import theme from '../theme';

const RepositoryItem = (props) => {
  const { item } = props;

  const formatCount = (count) => {
    if (count > 1000) {
      return (count / 1000).toFixed(1) + 'k';
    }
    return count;
  };
  console.log(item);
  return (
    <View style={styles.itemContainer}>
      <View style={styles.itemContainerTop}>
        <Image
          source={{ uri: item.ownerAvatarUrl }}
          style={styles.imageAvatar}
        />
        <View style={styles.itemContainerTopText}>
          <Text style={styles.textFullName}>{item.fullName}</Text>
          <Text style={styles.textDescription}>{item.description}</Text>
          <Text style={styles.textLanguage}>{item.language}</Text>
        </View>
      </View>
      {/* Stars */}
      <View style={styles.itemContainerBottom}>
        <View style={styles.textCountContainer}>
          <Text style={styles.textCountNumber}>
            {formatCount(item.stargazersCount)}
          </Text>
          <Text style={styles.textCountTitle}>Stars</Text>
        </View>
        {/* Forks */}
        <View style={styles.textCountContainer}>
          <Text style={styles.textCountNumber}>
            {formatCount(item.forksCount)}
          </Text>
          <Text style={styles.textCountTitle}>Forks</Text>
        </View>
        {/* Reviews */}
        <View style={styles.textCountContainer}>
          <Text style={styles.textCountNumber}>
            {formatCount(item.reviewCount)}
          </Text>
          <Text style={styles.textCountTitle}>Reviews</Text>
        </View>
        {/* Rating */}
        <View style={styles.textCountContainer}>
          <Text style={styles.textCountNumber}>
            {formatCount(item.ratingAverage)}
          </Text>
          <Text style={styles.textCountTitle}>Rating</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: theme.colors.white,
    display: 'flex',
    flexDirection: 'column',
    padding: 15,
  },
  itemContainerTop: {
    display: 'flex',
    flexDirection: 'row',
    gap: 15,
    paddingBottom: 25,
  },
  itemContainerTopText: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: 5,
  },
  itemContainerBottom: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 35,
  },
  imageAvatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  textFullName: {
    fontSize: theme.fontSizes.body,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.textPrimary,
  },
  textDescription: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.textSecondary,
  },
  textLanguage: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.white,
    backgroundColor: theme.colors.primary,
    width: 'min-content',
    padding: 5,
    borderRadius: 5,
  },
  textCountContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  textCountNumber: {
    fontSize: theme.fontSizes.body,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.textPrimary,
  },
  textCountTitle: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.textSecondary,
  },
});

export default RepositoryItem;
