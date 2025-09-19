import { Text, View, Pressable, TextInput, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import theme from '../theme';

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

const SignIn = () => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log('Submitted values:', values);
    },
  });

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          placeholder="Username"
          value={formik.values.username}
          onChangeText={formik.handleChange('username')}
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
          style={
            formik.errors.password ? styles.textInputError : styles.textInput
          }
        />
        <Text style={styles.textError}>{formik.errors.password}</Text>
      </View>
      <Pressable onPress={formik.handleSubmit} style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Sign in</Text>
      </Pressable>
    </View>
  );
  // return <Text>The sign-in view</Text>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
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
});

export default SignIn;
