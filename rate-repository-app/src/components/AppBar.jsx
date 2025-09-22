import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useNavigate } from 'react-router-native';
import Constants from 'expo-constants';
import theme from '../theme';

const AppBar = () => {
  const navigate = useNavigate();

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.containerScroll}>
          <Pressable
            style={styles.appBarButton}
            onPress={() => navigate('/repositories')}
          >
            <Text style={styles.text}>Repositories</Text>
          </Pressable>
          <Pressable
            style={styles.appBarButton}
            onPress={() => navigate('/signin')}
          >
            <Text style={styles.text}>Sign in</Text>
          </Pressable>
          {/* START Remove later */}
          <Pressable
            style={styles.appBarButton}
            onPress={() => navigate('/signin')}
          >
            <Text style={styles.text}>Sign in Two</Text>
          </Pressable>
          <Pressable
            style={styles.appBarButton}
            onPress={() => navigate('/signin')}
          >
            <Text style={styles.text}>Lorem Ipsum Dolor Sit Amet</Text>
          </Pressable>
          <Pressable
            style={styles.appBarButton}
            onPress={() => navigate('/signin')}
          >
            <Text style={styles.text}>Lorem Ipsum Dolor Sit Amet</Text>
          </Pressable>
          <Pressable
            style={styles.appBarButton}
            onPress={() => navigate('/signin')}
          >
            <Text style={styles.text}>Lorem Ipsum Dolor Sit Amet</Text>
          </Pressable>
          {/* END Remove later */}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.backgroundSecondary,
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 20,
    width: '100%',
    height: 100,
  },
  containerScroll: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
  },
  text: {
    color: theme.colors.white,
    fontSize: theme.fontSizes.body,
    fontWeight: theme.fontWeights.bold,
    fontFamily: theme.fontFamilies.main,
    textTransform: 'uppercase',
  },
  appBarButton: {
    marginRight: 10,
  },
});

export default AppBar;
