import * as Yup from 'yup';

export const experienceSchema = Yup.object().shape({
  title: Yup.string().required('Job title is required'),
  company: Yup.string().required('Company name is required'),
  location: Yup.string().required('Location is required'),
  startDate: Yup.date().required('Start date is required'),
  endDate: Yup.date().when('current', {
    is: false,
    then: (schema) => schema.required('End date is required'),
    otherwise: (schema) => schema.nullable(),
  }),
  current: Yup.boolean().default(false),
  description: Yup.string().nullable(),
});

export const educationSchema = Yup.object().shape({
  school: Yup.string().required('School name is required'),
  degree: Yup.string().required('Degree is required'),
  fieldOfStudy: Yup.string().required('Field of study is required'),
  startDate: Yup.date().required('Start date is required'),
  endDate: Yup.date().when('current', {
    is: false,
    then: (schema) => schema.required('End date is required'),
    otherwise: (schema) => schema.nullable(),
  }),
  current: Yup.boolean().default(false),
  description: Yup.string().nullable(),
});

export const initialExperienceValues = {
  title: '',
  company: '',
  location: '',
  startDate: null,
  endDate: null,
  current: false,
  description: '',
};

export const initialEducationValues = {
  school: '',
  degree: '',
  fieldOfStudy: '',
  startDate: null,
  endDate: null,
  current: false,
  description: '',
};
