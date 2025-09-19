import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NativeRouter } from 'react-router-native';
import Main from './src/Main';

export default function App() {
  return (
    <>
      <NativeRouter>
        <View style={styles.container}>
          <Main />
          <StatusBar style="auto" />
        </View>
      </NativeRouter>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    margin: 0,
  },
});
