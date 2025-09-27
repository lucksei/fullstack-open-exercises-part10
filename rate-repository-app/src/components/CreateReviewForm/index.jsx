import { View, TextInput, Text, Pressable, StyleSheet } from 'react-native';
import { useState } from 'react';
import { useNavigate } from 'react-router-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import useCreateReview from '../../hooks/useCreateReview';
import theme from '../../theme';

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: 0,
  review: '',
};

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Username is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup
    .number()
    .typeError('Rating must be a number')
    .min(0, 'Rating must be between 0 and 100')
    .max(100, 'Rating must be between 0 and 100')
    .required('Rating is required'),
  review: yup.string().optional(),
});

const CreateReviewFormContainer = ({ onSubmit, submitError }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          placeholder="Owner name"
          value={formik.values.ownerName}
          onChangeText={formik.handleChange('ownerName')}
          testID="username"
          style={
            formik.errors.ownerName ? styles.textInputError : styles.textInput
          }
        />
        <Text style={styles.textError}>{formik.errors.username}</Text>
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
        <Text style={styles.textError}>{formik.errors.repositoryName}</Text>
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
        <Text style={styles.textError}>{formik.errors.rating}</Text>
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
        <Text style={styles.textError}>{formik.errors.review}</Text>
      </View>
      <Pressable
        onPress={formik.handleSubmit}
        style={styles.submitButton}
        testID="submit"
      >
        <Text style={styles.submitButtonText}>Submit Review</Text>
      </Pressable>
      <View style={styles.submitError}>
        <Text style={styles.textError}>{submitError}</Text>
      </View>
    </View>
  );
};

const CreateReviewForm = () => {
  const navigate = useNavigate();
  const { createReview } = useCreateReview();
  const [submitError, setSubmitError] = useState(null);

  const onSubmit = async (values) => {
    const { ownerName, rating, repositoryName, review } = values;

    try {
      const { data } = await createReview({
        ownerName,
        rating: Number(rating),
        repositoryName,
        text: review,
      });
      navigate(`/repository/${data.createReview.repositoryId}`);
    } catch (error) {
      if (error.graphQLErrors) {
        console.log(error.graphQLErrors);
        setSubmitError(error.graphQLErrors[0].message);
      }
    }
  };

  return (
    <CreateReviewFormContainer onSubmit={onSubmit} submitError={submitError} />
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
  submitError: {
    flex: 1,
    flexGrow: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CreateReviewForm;
