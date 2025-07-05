import { updateProfile } from '@api/company';
import { checkAuth, withAuth } from '@auth';
import { DashboardLayout } from '@components';
import { CompanyForm } from '@components/Forms/Company';
import { HookForm } from '@components/HookForm';
import { useMutation, useQuery } from '@hooks';
import { initialValues, validationSchema } from '@models/company';
import { pick } from 'lodash';

const Page = () => {
  const { data, status } = useQuery('/profile');

  const mutation = useMutation(updateProfile);

  const handleSubmit = (values) => {
    const payload = pick(values, Object.keys(initialValues));
    mutation.mutateAsync(payload);
  };

  return (
    <DashboardLayout title="Profile" role="company">
      {status === 'success' && (
        <HookForm
          validationSchema={validationSchema}
          initialValues={{ ...initialValues, ...data }}
          onSubmit={handleSubmit}
        >
          <CompanyForm />
        </HookForm>
      )}
    </DashboardLayout>
  );
};

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
