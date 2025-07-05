import { checkAuth, withAuth } from '@auth';
import { DashboardLayout } from '@components';
import CompanyDashboard from '@components/Company/Dashboard';

const Page = () => {
  return (
    <DashboardLayout title="Dashboard" role="company">
      <CompanyDashboard />
    </DashboardLayout>
  );
};

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
