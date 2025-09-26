import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';
import useRepositories from '../../hooks/useRepositories';
import RepositoryItem from '../RepositoryItem';

const RepositoryList = () => {
  const navigate = useNavigate();
  const { repositories } = useRepositories();
  const onPress = (id) => {
    navigate(`/repository/${id}`);
  };

  return (
    <RepositoryListContainer repositories={repositories} onPress={onPress} />
  );
};

export const RepositoryListContainer = ({ repositories, onPress }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      renderItem={({ item }) => (
        <Pressable onPress={() => onPress(item.id)}>
          <RepositoryItem repository={item} />
        </Pressable>
      )}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={ItemSeparator}
      style={styles.container}
    />
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

export default RepositoryList;
