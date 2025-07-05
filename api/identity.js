import { appendToFormData } from '@functions';
import { axiosAuth } from '@lib';

export { default as confirm } from './confirm';
export { default as forgot } from './forgot';
export { default as login } from './login';
export { default as logout } from './logout';
export { default as refreshToken } from './refresh-token';
export { default as reset } from './reset';
export { default as signup } from './signup';

export const updateAvatar = async (avatar) => {
  const formData = new FormData();

  appendToFormData(formData, 'avatar', avatar);

  return axiosAuth.put('/update-avatar', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const deleteAvatar = async () => axiosAuth.delete('/delete-avatar');
