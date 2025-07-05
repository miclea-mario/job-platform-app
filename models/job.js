import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  title: Yup.string().max(128, 'Title is too long').required(),
  city: Yup.string(),
  workplaceType: Yup.string().required(),
  description: Yup.string().required(),
  requirements: Yup.array().of(Yup.string().required()),
  responsibilities: Yup.array().of(Yup.string().required()),
  requiredSkills: Yup.array().of(Yup.string().required()),
  preferredSkills: Yup.array().of(Yup.string().required()),
  minimumQualification: Yup.string().required(),
  salary: Yup.object().shape({
    min: Yup.number().min(0, "Can't be negative"),
    max: Yup.number().min(0, "Can't be negative"),
  }),
  benefits: Yup.array().of(Yup.string().required()),
  employmentType: Yup.string().required(),
  experienceLevel: Yup.string().required(),
  deadlineDate: Yup.date().required(),
  departament: Yup.string(),
  numberOfOpenings: Yup.number().min(1, "Can't be less than 1"),
  skills: Yup.array().of(Yup.string().required()),
});

export const initialValues = {
  title: '',
  city: '',
  workplaceType: '',
  description: '',
  requirements: [],
  responsibilities: [],
  requiredSkills: [],
  preferredSkills: [],
  minimumQualification: '',
  salary: {
    min: 0,
    max: 0,
  },
  benefits: [],
  employmentType: '',
  experienceLevel: '',
  deadlineDate: '',
  departament: '',
  numberOfOpenings: 1,
  skills: [],
};
