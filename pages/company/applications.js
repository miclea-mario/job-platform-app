import { checkAuth, withAuth } from '@auth';
import { DashboardLayout } from '@components';
import { ApplicationsTable } from '@components/Company';
import { useRouter } from 'next/router';

const Page = () => {
  const router = useRouter();
  const { selected } = router.query;

  return (
    <DashboardLayout title="Applications" role="company">
      <div className="flex flex-col space-y-6">
        {/* Header */}
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <p className="text-muted-foreground">Manage your applications and track applicants</p>
        </div>

        {/* Jobs Table */}
        <ApplicationsTable selectedApplication={selected} />
      </div>
    </DashboardLayout>
  );
};

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
