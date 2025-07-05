import { Loading } from '@components';
import { JobDetailsPage } from '@components/Jobs';
import { Layout } from '@components/User';
import { useQuery } from '@hooks';
import { useRouter } from 'next/router';

const Page = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, status, ...props } = useQuery(`jobs/${id}`);

  return (
    <Layout>
      {status === 'loading' && <Loading />}
      {status === 'success' && <JobDetailsPage job={data} {...props} />}
    </Layout>
  );
};

export default Page;
