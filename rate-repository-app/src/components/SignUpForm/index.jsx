import { Text, View, Pressable, TextInput, StyleSheet } from 'react-native';
import { useState } from 'react';
import { useNavigate } from 'react-router-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import useSignUp from '../../hooks/useSignUp';
import theme from '../../theme';

const initialValues = {
  username: '',
  password: '',
  confirmPassword: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, 'Username must be at least 5 characters long')
    .max(30, 'Username must be at most 30 characters long')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Password must be at least 5 characters long')
    .max(30, 'Password must be at most 30 characters long')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const SignUpFormContainer = ({ onSubmit, submitError }) => {
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
      <View>
        <TextInput
          placeholder="Confirm Password"
          value={formik.values.confirmPassword}
          onChangeText={formik.handleChange('confirmPassword')}
          style={
            formik.errors.confirmPassword
              ? styles.textInputError
              : styles.textInput
          }
        />
        <Text style={styles.textError}>{formik.errors.confirmPassword}</Text>
      </View>
      <Pressable
        style={styles.submitButton}
        onPress={() => formik.handleSubmit()}
      >
        <Text style={styles.submitButtonText}>Sign Up</Text>
      </Pressable>
      <View style={styles.submitError}>
        <Text style={styles.submitError}>{submitError}</Text>
      </View>
    </View>
  );
};

const SignUpForm = () => {
  const navigate = useNavigate();
  const { signUp } = useSignUp();
  const [submitError, setSubmitError] = useState(null);

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      const { data } = await signUp({ username, password });
      if (data.createUser.username) {
        navigate('/');
      }
    } catch (error) {
      if (error.graphQLErrors) {
        console.log(error.graphQLErrors);
        setSubmitError(error.graphQLErrors[0].message);
      }
    }
  };

  return <SignUpFormContainer onSubmit={onSubmit} submitError={submitError} />;
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
  submitError: {
    flex: 0,
    flexDirection: 'row',
    flexGrow: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SignUpForm;
