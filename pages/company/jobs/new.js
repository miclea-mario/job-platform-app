import { createJob } from '@api/company';
import { checkAuth, withAuth } from '@auth';
import { DashboardLayout } from '@components';
import { JobForm } from '@components/Forms/Company';
import { HookForm } from '@components/HookForm';
import { useMutation } from '@hooks';
import { initialValues, validationSchema } from '@models/job';
import { useRouter } from 'next/router';

const Page = () => {
  const router = useRouter();

  const mutation = useMutation(createJob, {
    onSuccess: () => {
      router.push('/company/jobs');
    },
  });

  const handleSubmit = (values) => {
    mutation.mutateAsync(values);
  };

  return (
    <DashboardLayout title="Add new job" role="company">
      <HookForm
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        <JobForm />
      </HookForm>
    </DashboardLayout>
  );
};

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
