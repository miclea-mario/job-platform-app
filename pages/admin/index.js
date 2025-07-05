import { checkAuth, withAuth } from '@auth';
import { DashboardLayout } from '@components';

const Page = () => {
  return (
    <DashboardLayout title="Dashboard">
      <div className="prose max-w-full">
        <h2 className="mb-4 font-semibold">Hello world</h2>
        <p>This is a secured admin page. Modify it as you wish.</p>
      </div>
    </DashboardLayout>
  );
};

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
