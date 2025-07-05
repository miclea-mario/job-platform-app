import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  name: Yup.string().required(),
  description: Yup.string().required(),
  industry: Yup.string().required(),
  phone: Yup.string().required(),
  website: Yup.string().url(),
  address: Yup.string().required(),
  city: Yup.string().required(),
  country: Yup.string().required(),
  postalCode: Yup.string().required(),
  foundedYear: Yup.number().required(),
  companySize: Yup.string().required(),
  benefits: Yup.array().of(Yup.string().required()),
  values: Yup.array().of(Yup.string().required()),
  avatar: Yup.mixed(),
});

export const initialValues = {
  name: '',
  email: '',
  description: '',
  industry: '',
  phone: '',
  website: '',
  address: '',
  city: '',
  country: '',
  postalCode: '',
  foundedYear: '',
  companySize: '',
  benefits: [],
  values: [],
  avatar: null,
};
