import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useState } from 'react';
import { useNavigate } from 'react-router-native';
import { useDebounce } from 'use-debounce';
import useRepositories from '../../hooks/useRepositories';
import RepositoryItem from '../RepositoryItem';
import SortBar from './SortBar';
import SearchBar from './SearchBar';

const RepositoryList = () => {
  const navigate = useNavigate();
  const [orderBy, setOrderBy] = useState('CREATED_AT');
  const [orderDirection, setOrderDirection] = useState('DESC');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchKeyword] = useDebounce(searchQuery, 500);
  const { repositories } = useRepositories({
    orderBy,
    orderDirection,
    searchKeyword,
  });
  const onPress = (id) => {
    navigate(`/repository/${id}`);
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      setOrderBy={setOrderBy}
      setOrderDirection={setOrderDirection}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      onPress={onPress}
    />
  );
};

export const RepositoryListContainer = ({
  repositories,
  setOrderBy,
  setOrderDirection,
  searchQuery,
  setSearchQuery,
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
        <View>
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <SortBar
            setOrderBy={setOrderBy}
            setOrderDirection={setOrderDirection}
          />
        </View>
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
