import { axiosAuth } from '@lib';

export const changePassword = (data) => {
  return axiosAuth.post('/admin/change-password', data);
};

export const toggleUserStatus = (userId) => {
  return axiosAuth.patch(`/admin/users/${userId}/toggle-status`);
};
