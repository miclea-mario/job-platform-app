import { appendToFormData } from '@functions';
import { axiosAuth } from '@lib';

export const updateProfile = async (profileData) => {
  return axiosAuth.put('/user/profile', profileData);
};

export const updateResume = async (resumeFile) => {
  const formData = new FormData();
  appendToFormData(formData, 'resume', resumeFile);

  return axiosAuth.put('/user/resume', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const extractProfileFromResume = async () => {
  return axiosAuth.post('/user/extract-profile-from-resume');
};

export const applyJob = async (jobId) => {
  return axiosAuth.post(`/user/apply/${jobId}`);
};
