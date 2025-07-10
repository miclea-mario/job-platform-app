import { axiosAuth } from '@lib';

export const getDashboardStats = () => {
  return axiosAuth.get('/admin/dashboard/stats');
};

export const changePassword = (data) => {
  return axiosAuth.post('/admin/change-password', data);
};

export const toggleUserStatus = (userId) => {
  return axiosAuth.patch(`/admin/users/${userId}/toggle-status`);
};

export const toggleJobStatus = (jobId) => {
  return axiosAuth.patch(`/admin/jobs/${jobId}/toggle-status`);
};
