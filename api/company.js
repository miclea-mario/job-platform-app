import { appendToFormData } from '@functions';
import { axiosAuth } from '@lib';
import { forEach } from 'lodash';

export const updateProfile = async (values) => {
  const formData = new FormData();

  forEach(values, (value, key) => {
    appendToFormData(formData, key, value);
  });

  return axiosAuth.put('/company/update', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

// Dashboard API calls
export const getDashboardStats = async () => {
  return axiosAuth.get('/company/dashboard/stats');
};

export const getDashboardJobs = async (params = {}) => {
  return axiosAuth.get('/company/dashboard/jobs', { params });
};

export const getDashboardApplications = async (params = {}) => {
  return axiosAuth.get('/company/dashboard/applications', { params });
};

export const getDashboardPerformance = async (params = {}) => {
  return axiosAuth.get('/company/dashboard/performance', { params });
};

// Jobs API calls
export const createJob = async (data) => {
  return axiosAuth.post('/company/jobs', data);
};

export const deleteJob = async (id) => {
  return axiosAuth.delete(`/company/jobs/${id}`);
};

export const updateJobVisibility = async ({ id, isActive }) => {
  return axiosAuth.put(`/company/jobs/${id}/visibility`, { isActive });
};

export const updateJob = async ({ id, ...data }) => {
  return axiosAuth.put(`/company/jobs/${id}`, data);
};

export const updateApplicationStatus = async ({ id, ...data }) => {
  return axiosAuth.put(`/company/applications/${id}/update-status`, data);
};
