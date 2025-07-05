import { Loading } from '@components';
import { InterviewRoom } from '@components/Interview';
import { Layout } from '@components/User';
import { useQuery } from '@hooks';
import { useRouter } from 'next/router';

const Page = () => {
  const router = useRouter();
  const { applicationId } = router.query;
  const { data, status } = useQuery(`interview/${applicationId}`);

  return (
    <Layout>
      {status === 'loading' && <Loading />}
      {status === 'success' && (
        <InterviewRoom token={data.token} user={data.user} applicationId={applicationId} />
      )}
    </Layout>
  );
};

export default Page;
