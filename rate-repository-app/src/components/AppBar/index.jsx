import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useNavigate } from 'react-router-native';
import Constants from 'expo-constants';
import { useQuery } from '@apollo/client';
import { ME } from '../../graphql/queries';
import useSignIn from '../../hooks/useSignIn';
import theme from '../../theme';

const AppBar = () => {
  const navigate = useNavigate();
  const { data } = useQuery(ME, {
    fetchPolicy: 'cache-and-network',
  });
  const { signOut } = useSignIn();
  const me = data?.me;

  const handleSignOut = async () => {
    await signOut();
    navigate('/signin');
  };

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
          {me && (
            <Pressable
              style={styles.appBarButton}
              onPress={() => navigate('/createreview')}
            >
              <Text style={styles.text}>Create a review</Text>
            </Pressable>
          )}
          {!me && (
            <Pressable
              style={styles.appBarButton}
              onPress={() => navigate('/signin')}
            >
              <Text style={styles.text}>Sign in</Text>
            </Pressable>
          )}
          {me && (
            <Pressable
              style={styles.appBarButton}
              onPress={() => handleSignOut()}
            >
              <Text style={styles.text}>Sign out ({me.username})</Text>
            </Pressable>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.textSecondary,
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 20,
    width: '100%',
    height: 100,
  },
  containerScroll: {
    display: 'flex',
    flexDirection: 'row',
    columnGap: 10,
    flexWrap: 'nowrap',
    alignItems: 'center',
  },
  text: {
    color: theme.colors.white,
    fontSize: theme.fontSizes.body,
    fontWeight: theme.fontWeights.bold,
    fontFamily: theme.fontFamilies.main,
  },
  appBarButton: {
    marginRight: 10,
  },
});

export default AppBar;
