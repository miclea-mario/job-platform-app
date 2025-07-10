import { checkAuth, withAuth } from '@auth';
import { DashboardLayout } from '@components';
import { JobsTable } from '@components/Admin';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { useQuery } from '@hooks';
import { Briefcase, Clock, TrendingUp, Users } from 'lucide-react';

const Page = () => {
  // Get job stats for the overview cards
  const { data: allJobs } = useQuery('admin/jobs');
  const jobs = allJobs?.pages || [];

  const totalJobs = jobs.length;
  const activeJobs = jobs.filter((job) => job.isActive).length;
  const inactiveJobs = totalJobs - activeJobs;
  const expiredJobs = jobs.filter((job) => {
    const deadline = job.deadlineDate;
    return deadline && new Date(deadline) < new Date();
  }).length;

  return (
    <DashboardLayout title="Jobs Management">
      <div className="flex flex-col space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalJobs}</div>
              <p className="text-xs text-muted-foreground">All job listings</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{activeJobs}</div>
              <p className="text-xs text-muted-foreground">Currently accepting applications</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Inactive Jobs</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-600">{inactiveJobs}</div>
              <p className="text-xs text-muted-foreground">Paused or deactivated</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Expired Jobs</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{expiredJobs}</div>
              <p className="text-xs text-muted-foreground">Past application deadline</p>
            </CardContent>
          </Card>
        </div>

        {/* Jobs Table */}
        <div className="prose max-w-full">
          <JobsTable />
        </div>
      </div>
    </DashboardLayout>
  );
};

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
