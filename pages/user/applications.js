import { checkAuth, withAuth } from '@auth';
import { ApplicationsTable, Layout } from '@components/User';

const Page = () => {
  return (
    <Layout>
      <ApplicationsTable />
    </Layout>
  );
};

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
