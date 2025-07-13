import { deleteAvatar, updateAvatar } from '@api/identity';
import { updateProfile } from '@api/user';
import { useMutation } from '@hooks';
import { isFunction } from 'lodash';
import AboutSection from './ProfileSections/AboutSection';
import ContactSection from './ProfileSections/ContactSection';
import EducationSection from './ProfileSections/EducationSection';
import ExperienceSection from './ProfileSections/ExperienceSection';
import ProfileHeader from './ProfileSections/ProfileHeader';
import ResumeSection from './ProfileSections/ResumeSection';
import SkillsSection from './ProfileSections/SkillsSection';

const calculateProfileCompletion = (profile) => {
  const fields = [
    { value: profile.avatar, weight: 10 },
    { value: profile.name, weight: 10 },
    { value: profile.title, weight: 10 },
    { value: profile.bio, weight: 15 },
    { value: profile.skills?.length > 0, weight: 15 },
    { value: profile.phone, weight: 10 },
    { value: profile.email, weight: 10 },
    { value: profile.location, weight: 10 },
    { value: profile.resume, weight: 10 },
  ];

  const totalWeight = fields.reduce((sum, field) => sum + field.weight, 0);
  const completedWeight = fields.reduce((sum, field) => sum + (field.value ? field.weight : 0), 0);

  return Math.round((completedWeight / totalWeight) * 100);
};

const Profile = ({
  avatar,
  name,
  title,
  bio,
  skills = [],
  phone,
  email,
  location,
  resume,
  experience = [],
  education = [],
  refetch,
}) => {
  const updateAvatarMutation = useMutation(updateAvatar, {
    successCallback: () => {
      if (isFunction(refetch)) {
        refetch();
      }
    },
  });
  const deleteAvatarMutation = useMutation(deleteAvatar, {
    successCallback: () => {
      if (isFunction(refetch)) {
        refetch();
      }
    },
  });
  const updateProfileMutation = useMutation(updateProfile, {
    successCallback: () => {
      if (isFunction(refetch)) {
        refetch();
      }
    },
  });

  const handleUpdateAvatar = (file) => {
    return updateAvatarMutation.mutateAsync(file);
  };

  const handleDeleteAvatar = () => {
    return deleteAvatarMutation.mutateAsync();
  };

  const updateProfileSection = (section, data) => {
    // Update the profile on the server
    // For resume, we don't need to call updateProfile as it's uploaded directly
    if (section !== 'resume') {
      updateProfileMutation
        .mutateAsync({
          [section]: data,
        })
        .catch((error) => {
          console.error('Failed to update profile:', error);
        });
    }
  };

  const profileCompletion = calculateProfileCompletion({
    avatar,
    name,
    title,
    bio,
    skills,
    phone,
    email,
    location,
    resume,
  });

  return (
    <div>
      <ProfileHeader
        avatar={avatar}
        name={name}
        title={title}
        profileCompletion={profileCompletion}
        onUpdateAvatar={handleUpdateAvatar}
        onDeleteAvatar={handleDeleteAvatar}
        onUpdate={(data) => updateProfileSection('title', data)}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-4">
        <div className="lg:col-span-3 flex flex-col gap-4">
          <AboutSection bio={bio} onUpdate={(data) => updateProfileSection('bio', data)} />

          <ExperienceSection
            experience={experience}
            onUpdate={(data) => updateProfileSection('experience', data)}
          />

          <EducationSection
            education={education}
            onUpdate={(data) => updateProfileSection('education', data)}
          />
        </div>

        <div className="flex flex-col gap-4 lg:col-span-1">
          <ContactSection
            phone={phone}
            email={email}
            location={location}
            onUpdate={(data) => {
              const { phone, location } = data;

              updateProfileMutation
                .mutateAsync({
                  phone,
                  location,
                })
                .catch((error) => {
                  console.error('Failed to update profile:', error);
                });
            }}
          />

          <ResumeSection
            resume={resume}
            onUpdate={(data) => updateProfileSection('resume', data)}
          />

          <SkillsSection
            skills={skills}
            onUpdate={(data) => updateProfileSection('skills', data)}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
