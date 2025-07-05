const appendToFormData = (formData, key, value) => {
  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      appendToFormData(formData, `${key}.${index}`, item);
    });
  } else if (value instanceof File) {
    formData.append(key, value);
  } else if (typeof value === 'object' && value !== null) {
    Object.keys(value).forEach((subKey) => {
      appendToFormData(formData, `${key}.${subKey}`, value[subKey]);
    });
  } else {
    formData.append(key, value);
  }
};

export default appendToFormData;
