import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useState } from 'react';
import { useNavigate } from 'react-router-native';
import useRepositories from '../../hooks/useRepositories';
import RepositoryItem from '../RepositoryItem';
import ListHeader from './ListHeader';

const RepositoryList = () => {
  const navigate = useNavigate();
  const [orderBy, setOrderBy] = useState('CREATED_AT');
  const [orderDirection, setOrderDirection] = useState('DESC');
  const { repositories } = useRepositories({
    orderBy,
    orderDirection,
  });
  const onPress = (id) => {
    navigate(`/repository/${id}`);
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      setOrderBy={setOrderBy}
      setOrderDirection={setOrderDirection}
      onPress={onPress}
    />
  );
};

export const RepositoryListContainer = ({
  repositories,
  setOrderBy,
  setOrderDirection,
  onPress,
}) => {
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
      ListHeaderComponent={
        <ListHeader
          setOrderBy={setOrderBy}
          setOrderDirection={setOrderDirection}
        />
      }
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
