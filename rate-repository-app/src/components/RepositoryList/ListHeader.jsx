import { View, StyleSheet } from 'react-native';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';

const ListHeader = ({ setOrderBy, setOrderDirection }) => {
  const [sort, setSort] = useState('latestRepositories');

  const handleSort = (itemValue) => {
    switch (itemValue) {
      case 'latestRepositories': {
        setSort('latestRepositories');
        setOrderBy('CREATED_AT');
        setOrderDirection('DESC');
        break;
      }
      case 'highestRated': {
        setSort('highestRated');
        setOrderBy('RATING_AVERAGE');
        setOrderDirection('DESC');
        break;
      }
      case 'lowestRated': {
        setSort('lowestRated');
        setOrderBy('RATING_AVERAGE');
        setOrderDirection('ASC');
        break;
      }
      default: {
        setSort('latestRepositories');
        setOrderBy('CREATED_AT');
        setOrderDirection('DESC');
      }
    }
  };
  return (
    <View style={styles.container}>
      <Picker
        selectedValue={sort}
        onValueChange={(itemValue) => handleSort(itemValue)}
      >
        <Picker.Item label="Latest Repositories" value="latestRepositories" />
        <Picker.Item label="Highest Rated" value="highestRated" />
        <Picker.Item label="Lowest Rated" value="lowestRated" />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
    width: '100%',
  },
});
export default ListHeader;
