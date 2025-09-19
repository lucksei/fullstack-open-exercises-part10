import { View, StyleSheet } from 'react-native';
import { Route, Routes } from 'react-router-native';
import RepositoryList from './components/RepositoryList';
import SignIn from './components/SignIn';
import AppBar from './components/AppBar';
import { Navigate } from 'react-router-native';
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
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/repositories" element={<RepositoryList />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
