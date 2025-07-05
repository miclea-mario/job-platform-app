import { withAuth } from '@auth';
import { DashboardLayout } from '@components';
import { MyProfile } from '@examples/components';

const Page = () => {
  return (
    <DashboardLayout title="My profile">
      <MyProfile />
    </DashboardLayout>
  );
};

export async function getStaticProps() {
  // hide page on production environments
  if (process.env.NODE_ENV === 'production') {
    return {
      notFound: true,
    };
  }

  return {
    props: {},
  };
}

export default withAuth(Page);
