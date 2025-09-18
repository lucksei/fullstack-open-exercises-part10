import { View, Text } from 'react-native';

const RepositoryItem = (props) => {
  const { item } = props;
  return (
    <View>
      <Text>Full Name: {item.fullName}</Text>
      <Text>Description: {item.description}</Text>
      <Text>Language: {item.language}</Text>
      <Text>ForkCounts: {item.forksCount}</Text>
      <Text>stargazersCount: {item.stargazersCount}</Text>
      <Text>ratingAverage: {item.ratingAverage}</Text>
      <Text>reviewCount: {item.reviewCount}</Text>
      <Text>ownerAvatarUrl: {item.ownerAvatarUrl}</Text>
      <Text>RepositoryItem</Text>
    </View>
  );
};

export default RepositoryItem;
