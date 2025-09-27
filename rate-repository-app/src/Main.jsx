import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Route, Routes, Navigate } from 'react-router-native';
import AppBar from './components/AppBar';
import SignInForm from './components/SignInForm';
import CreateReviewForm from './components/CreateReviewForm';
import RepositoryList from './components/RepositoryList';
import RepositoryInfo from './components/RepositoryInfo';
import theme from './theme';

import { useFonts } from 'expo-font';

const Main = () => {
  // eslint-disable-next-line
  const [loaded, error] = useFonts({
    Arimo: require('./../assets/fonts/Arimo/static/Arimo-Regular.ttf'),
    Roboto: require('./../assets/fonts/Roboto/static/Roboto-Regular.ttf'),
  });

  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/createreview" element={<CreateReviewForm />} />
        <Route path="/repositories" element={<RepositoryList />} />
        <Route path="/repository/:id" element={<RepositoryInfo />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'start',
    height: '100%',
    width: '100%',
    backgroundColor: theme.colors.backgroundPrimary,
    padding: 0,
    margin: 0,
  },
});
export default Main;
