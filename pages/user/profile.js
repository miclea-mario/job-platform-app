import { checkAuth, withAuth } from '@auth';
import { Loading } from '@components';
import { Layout } from '@components/User';
import Profile from '@components/User/Profile';
import { useQuery } from '@hooks';

const Page = () => {
  const { data, status, refetch } = useQuery('/profile');

  return (
    <Layout>
      <div className="mx-auto max-w-[1200px] lg:px-8">
        {status === 'loading' && <Loading />}
        {status === 'success' && <Profile {...data} refetch={refetch} />}
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
