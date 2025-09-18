import { View, StyleSheet } from 'react-native';
import RepositoryList from './components/RepositoryList';
import AppBar from './components/AppBar';
import theme from './theme';

const styles = StyleSheet.create({
  content: {
    height: '100%',
    width: '100%',
    backgroundColor: theme.colors.backgroundPrimary,
  },
});

const Main = () => {
  return (
    <View style={styles.content}>
      <AppBar />
      <RepositoryList />
    </View>
  );
};

export default Main;
