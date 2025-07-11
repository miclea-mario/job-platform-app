import { checkAuth, withAuth } from '@auth';
import { DashboardLayout } from '@components';
import { Badge } from '@components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card';
import { ChartContainer, ChartTooltip } from '@components/ui/chart';
import { Progress } from '@components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs';
import { useQuery } from '@hooks';
import {
  Activity,
  AlertTriangle,
  BarChart as BarChartIcon,
  Briefcase,
  Building2,
  Loader2,
  PieChart as PieChartIcon,
  Target,
  UserCheck,
  Users,
} from 'lucide-react';
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, XAxis, YAxis } from 'recharts';

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

const Page = () => {
  // Fetch optimized dashboard statistics
  const { data: dashboardData, isLoading } = useQuery('/admin/dashboard/stats', {
    refetchInterval: 60000, // Refetch every minute
  });

  if (isLoading) {
    return (
      <DashboardLayout title="Admin Dashboard">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </DashboardLayout>
    );
  }

  if (!dashboardData) {
    return (
      <DashboardLayout title="Admin Dashboard">
        <div className="text-center py-8">
          <p className="text-muted-foreground">Failed to load dashboard data</p>
        </div>
      </DashboardLayout>
    );
  }

  const { overview, userStats, recentActivity, growth, platformHealth } = dashboardData;

  // Prepare chart data
  const usersByRole = [
    { name: 'Job Seekers', value: userStats.jobSeekers, fill: '#3b82f6' },
    { name: 'Companies', value: userStats.companies, fill: '#8b5cf6' },
    { name: 'Admins', value: userStats.admins, fill: '#f59e0b' },
  ].filter((item) => item.value > 0);

  const jobsByStatus = [
    { name: 'Active', value: overview.activeJobs, fill: '#10b981' },
    { name: 'Inactive', value: overview.inactiveJobs, fill: '#f59e0b' },
    { name: 'Expired', value: overview.expiredJobs, fill: '#ef4444' },
  ].filter((item) => item.value > 0);

  const chartConfig = {
    users: {
      label: 'New Users',
      color: '#3b82f6',
    },
    jobs: {
      label: 'New Jobs',
      color: '#8b5cf6',
    },
    applications: {
      label: 'New Applications',
      color: '#f59e0b',
    },
  };

  // Format growth rates for display
  const formatGrowthRate = (rate) => {
    if (rate === 0) return '0%';
    return `${rate > 0 ? '+' : ''}${rate.toFixed(1)}%`;
  };

  return (
    <DashboardLayout title="Admin Dashboard">
      <div className="space-y-6">
        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overview.totalUsers}</div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                  {overview.activeUsers} active, {overview.inactiveUsers} inactive
                </p>
                <Badge variant="secondary" className="text-xs">
                  {formatGrowthRate(growth.userGrowthRate)}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overview.totalJobs}</div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                  {overview.activeJobs} active, {overview.inactiveJobs} inactive
                </p>
                <Badge variant="secondary" className="text-xs">
                  {formatGrowthRate(growth.jobGrowthRate)}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Companies</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{userStats.companies}</div>
              <p className="text-xs text-muted-foreground">
                {overview.totalUsers > 0
                  ? ((userStats.companies / overview.totalUsers) * 100).toFixed(1)
                  : 0}
                % of total users
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{recentActivity.total}</div>
              <p className="text-xs text-muted-foreground">
                {recentActivity.users} users, {recentActivity.jobs} jobs,{' '}
                {recentActivity.applications} applications
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Platform Health Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="h-5 w-5 text-green-600" />
                User Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Active Users</span>
                <span className="font-medium">{platformHealth.userActivityRate.toFixed(1)}%</span>
              </div>
              <Progress value={platformHealth.userActivityRate} className="h-2" />
              <div className="text-xs text-muted-foreground">
                {overview.activeUsers} out of {overview.totalUsers} users are active
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-600" />
                Job Availability
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Active Jobs</span>
                <span className="font-medium">{platformHealth.jobActivityRate.toFixed(1)}%</span>
              </div>
              <Progress value={platformHealth.jobActivityRate} className="h-2" />
              <div className="text-xs text-muted-foreground">
                {overview.activeJobs} out of {overview.totalJobs} jobs are active
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                Attention Required
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                  <span className="text-sm">Inactive Users</span>
                  <Badge variant="destructive">{overview.inactiveUsers}</Badge>
                </div>
                <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                  <span className="text-sm">Expired Jobs</span>
                  <Badge variant="outline">{overview.expiredJobs}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Analytics */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">User Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader className="flex-col">
                  <CardTitle className="flex items-center gap-2">
                    <PieChartIcon className="h-5 w-5" />
                    Users by Role
                  </CardTitle>
                  <CardDescription>Distribution of user types on the platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                    <PieChart>
                      <Pie
                        data={usersByRole}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {usersByRole.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <ChartTooltip />
                    </PieChart>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex-col">
                  <CardTitle className="flex items-center gap-2">
                    <BarChartIcon className="h-5 w-5" />
                    Jobs by Status
                  </CardTitle>
                  <CardDescription>Current status of all job postings</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                    <BarChart data={jobsByStatus}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip />
                      <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                        {jobsByStatus.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Job Seekers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600">{userStats.jobSeekers}</div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Individual users looking for employment opportunities
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Companies</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-600">{userStats.companies}</div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Organizations posting job opportunities
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Administrators</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-orange-600">{userStats.admins}</div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Platform administrators and moderators
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="flex-col">
                <CardTitle>User Status Overview</CardTitle>
                <CardDescription>Account status distribution across all users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Active Users</span>
                      <span className="text-sm text-muted-foreground">{overview.activeUsers}</span>
                    </div>
                    <Progress value={platformHealth.userActivityRate} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Inactive Users</span>
                      <span className="text-sm text-muted-foreground">
                        {overview.inactiveUsers}
                      </span>
                    </div>
                    <Progress value={100 - platformHealth.userActivityRate} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default withAuth(Page);
