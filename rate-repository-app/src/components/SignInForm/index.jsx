import { Text, View, Pressable, TextInput, StyleSheet } from 'react-native';
import { useState } from 'react';
import { useNavigate } from 'react-router-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import useSignIn from '../../hooks/useSignIn';
import theme from '../../theme';

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

export const SignInFormContainer = ({ onSubmit, authError }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          placeholder="Username"
          value={formik.values.username}
          onChangeText={formik.handleChange('username')}
          testID="username"
          style={
            formik.errors.username ? styles.textInputError : styles.textInput
          }
        />
        <Text style={styles.textError}>{formik.errors.username}</Text>
      </View>
      <View>
        <TextInput
          placeholder="Password"
          value={formik.values.password}
          onChangeText={formik.handleChange('password')}
          testID="password"
          style={
            formik.errors.password ? styles.textInputError : styles.textInput
          }
        />
        <Text style={styles.textError}>{formik.errors.password}</Text>
      </View>
      <Pressable
        onPress={formik.handleSubmit}
        style={styles.submitButton}
        testID="submit"
      >
        <Text style={styles.submitButtonText}>Sign in</Text>
      </Pressable>
      <View style={styles.authError}>
        <Text style={styles.textError}>{authError}</Text>
      </View>
    </View>
  );
};

const SignInForm = () => {
  const navigate = useNavigate();
  const { signIn } = useSignIn();
  const [authError, setAuthError] = useState(null);

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });

      if (data.authenticate.accessToken) {
        navigate('/');
      }
    } catch (error) {
      if (error.graphQLErrors) {
        console.log(error.graphQLErrors);
        setAuthError(error.graphQLErrors[0].message);
      }
      // console.log(error);
    }
  };

  return <SignInFormContainer onSubmit={onSubmit} authError={authError} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'start',
    height: '100%',
    width: '100%',
    backgroundColor: theme.colors.white,
    padding: 25,
    rowGap: 10,
  },
  textInput: {
    padding: 10,
    borderColor: theme.colors.textSecondary,
    borderWidth: 1,
    borderRadius: 5,
    color: theme.colors.textSecondary,
    fontFamily: theme.fontFamilies.main,
  },
  textInputError: {
    padding: 10,
    borderColor: theme.colors.error,
    borderWidth: 1,
    borderRadius: 5,
    color: theme.colors.error,
    fontFamily: theme.fontFamilies.main,
  },
  submitButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
  },
  submitButtonText: {
    color: theme.colors.white,
    fontWeight: theme.fontWeights.bold,
    fontFamily: theme.fontFamilies.main,
  },
  textError: {
    color: theme.colors.error,
    fontFamily: theme.fontFamilies.main,
  },
  authError: {
    flex: 1,
    flexGrow: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SignInForm;
