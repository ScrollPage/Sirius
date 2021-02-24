import { Box, Button } from '@chakra-ui/react';
import { Form, Formik, FormikProps } from 'formik';
import React from 'react';
import { MyField } from './MyField';
import { object, string } from 'yup';
import useTranslation from 'next-translate/useTranslation';
import { useDispatch } from 'react-redux';
import { addDetector } from '@/store/actions/detector';

interface FormValues {
  x: string;
  y: string;
}

export const AddDetectorForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const validationSchema = object().shape({
    x: string().required(t('add:enter-x')),
    y: string().required(t('add:enter-y')),
  });

  return (
    <Box width="full">
      <Formik
        initialValues={{
          x: '',
          y: '',
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          await dispatch(addDetector(values.x, values.y));
          setSubmitting(false);
          resetForm();
        }}
      >
        {(props: FormikProps<FormValues>) => (
          <Form>
            <MyField
              size="lg"
              label={t('add:x')}
              name="x"
              type="text"
              placeholder={t('add:enter-x')}
            />
            <MyField
              size="lg"
              label={t('add:y')}
              name="y"
              type="text"
              placeholder={t('add:enter-y')}
            />
            <Button
              type="submit"
              w="full"
              mt="8"
              isLoading={props.isSubmitting}
              colorScheme="purple"
            >
              {t('add:submit')}
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
