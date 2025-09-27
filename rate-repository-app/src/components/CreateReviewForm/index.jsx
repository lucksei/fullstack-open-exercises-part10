import { View, TextInput, Text, Pressable, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import theme from '../../theme';

const initialValues = {
  username: '',
  password: '',
  rating: 0,
  review: '',
};

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup
    .number('Rating must be a number')
    .min(0, 'Rating must be between 0 and 100')
    .max(100, 'Rating must be between 0 and 100')
    .required('Rating is required'),
  review: yup.string().optional(),
});

const CreateReviewForm = ({ onSubmit, authError }) => {
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
      </View>
      <View>
        <TextInput
          placeholder="Repository name"
          value={formik.values.repositoryName}
          onChangeText={formik.handleChange('repositoryName')}
          testID="repositoryName"
          style={
            formik.errors.repositoryName
              ? styles.textInputError
              : styles.textInput
          }
        />
      </View>
      <View>
        <TextInput
          placeholder="Rating"
          value={formik.values.rating}
          onChangeText={formik.handleChange('rating')}
          testID="rating"
          style={
            formik.errors.rating ? styles.textInputError : styles.textInput
          }
        />
      </View>
      <View>
        <TextInput
          placeholder="Review"
          value={formik.values.review}
          onChangeText={formik.handleChange('review')}
          multiline
          testID="review"
          style={styles.textInput}
        />
      </View>
      <Pressable
        onPress={formik.handleSubmit}
        style={styles.submitButton}
        testID="submit"
      >
        <Text style={styles.submitButtonText}>Submit Review</Text>
      </Pressable>
      <View style={styles.authError}>
        <Text style={styles.textError}>{authError}</Text>
      </View>
    </View>
  );
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

export default CreateReviewForm;
