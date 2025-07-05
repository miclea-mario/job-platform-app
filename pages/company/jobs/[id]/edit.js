import { updateJob } from '@api/company';
import { checkAuth, withAuth } from '@auth';
import { DashboardLayout, Loading } from '@components';
import { JobForm } from '@components/Forms/Company';
import { HookForm } from '@components/HookForm';
import { useMutation, useQuery } from '@hooks';
import { initialValues, validationSchema } from '@models/job';
import { useRouter } from 'next/router';

const Page = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: job, status } = useQuery(`company/jobs/${id}`);

  const mutation = useMutation(updateJob, {
    successCallback: () => {
      router.push('/company/jobs');
    },
  });

  const handleSubmit = (values) => {
    mutation.mutateAsync({ id, ...values });
  };

  return (
    <DashboardLayout title="Edit Job" role="company">
      {status === 'loading' && <Loading />}
      {status === 'success' && (
        <HookForm
          validationSchema={validationSchema}
          initialValues={job || initialValues}
          onSubmit={handleSubmit}
        >
          <JobForm />
        </HookForm>
      )}
    </DashboardLayout>
  );
};

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
