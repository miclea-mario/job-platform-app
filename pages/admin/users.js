import { checkAuth, withAuth } from '@auth';
import { DashboardLayout } from '@components';
import { UsersTable } from '@components/Admin';

const Page = () => {
  return (
    <DashboardLayout title="Dashboard">
      <div className="prose max-w-full">
        <UsersTable />
      </div>
    </DashboardLayout>
  );
};

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
