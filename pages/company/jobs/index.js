import { checkAuth, withAuth } from '@auth';
import { DashboardLayout, Link } from '@components';
import { JobsTable } from '@components/Company';
import { Button } from '@components/ui/button';
import { Plus } from 'lucide-react';

const Page = () => {
  return (
    <DashboardLayout title="Jobs" role="company">
      <div className="flex flex-col space-y-6">
        {/* Header */}
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Job Listings</h2>
            <p className="text-muted-foreground">Manage your job postings and track applications</p>
          </div>
          <Button asChild>
            <Link href="/company/jobs/new" className="no-underline">
              <Plus className="mr-2 h-4 w-4" />
              Post New Job
            </Link>
          </Button>
        </div>

        {/* Jobs Table */}
        <JobsTable />
      </div>
    </DashboardLayout>
  );
};

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
