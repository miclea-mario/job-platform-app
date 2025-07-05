'use client';

import { Badge } from '@components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs';
import { useQuery } from '@hooks';
import {
  Award,
  Briefcase,
  CalendarDays,
  Clock,
  Eye,
  Loader2,
  TrendingUp,
  UserCheck,
  Users,
} from 'lucide-react';
import ApplicationsChart from './ApplicationsChart';
import JobsOverviewChart from './JobsOverviewChart';
import PerformanceMetrics from './PerformanceMetrics';
import RecentActivity from './RecentActivity';

const Dashboard = () => {
  // Fetch dashboard data
  const { data: statsData, isLoading: statsLoading } = useQuery('/company/dashboard/stats', {
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  const { data: jobsData } = useQuery('/company/dashboard/jobs', {
    refetchInterval: 60000, // Refetch every minute
  });

  const { data: applicationsData } = useQuery('/company/dashboard/applications', {
    refetchInterval: 30000,
  });

  const { data: performanceData } = useQuery('/company/dashboard/performance', {
    refetchInterval: 60000,
  });

  // Loading state
  if (statsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  // Extract stats from API response
  const stats = statsData
    ? [
        {
          title: 'Total Jobs',
          value: statsData.totalJobs || 0,
          description: 'Active job postings',
          icon: Briefcase,
          trend: statsData.growth?.jobs || '+0%',
          color: 'text-blue-600',
          bgColor: 'bg-blue-50',
        },
        {
          title: 'Applications',
          value: statsData.totalApplications || 0,
          description: 'Total applications received',
          icon: Users,
          trend: statsData.growth?.applications || '+0%',
          color: 'text-green-600',
          bgColor: 'bg-green-50',
        },
        {
          title: 'Interviews',
          value: statsData.totalInterviews || 0,
          description: 'Scheduled interviews',
          icon: CalendarDays,
          trend: statsData.growth?.interviews || '+0%',
          color: 'text-purple-600',
          bgColor: 'bg-purple-50',
        },
        {
          title: 'Success Rate',
          value: statsData.successRate || 0,
          description: 'Interview to hire ratio',
          icon: TrendingUp,
          trend: statsData.growth?.successRate || '+0%',
          color: 'text-orange-600',
          bgColor: 'bg-orange-50',
          suffix: '%',
        },
      ]
    : [];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="relative overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <div className={`rounded-full p-2 ${stat.bgColor}`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stat.value.toLocaleString()}
                  {stat.suffix}
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                  <Badge variant="secondary" className="text-xs">
                    {stat.trend}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Section */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <JobsOverviewChart jobs={jobsData?.jobs || []} />
            <Card>
              <CardHeader className="flex-col">
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Quick Insights
                </CardTitle>
                <CardDescription>Key metrics at a glance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <UserCheck className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">Active Jobs</span>
                  </div>
                  <Badge variant="outline">{statsData?.activeJobs || 0}</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-orange-600" />
                    <span className="font-medium">Pending Applications</span>
                  </div>
                  <Badge variant="outline">{statsData?.pendingApplications || 0}</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Award className="h-5 w-5 text-green-600" />
                    <span className="font-medium">Completed Interviews</span>
                  </div>
                  <Badge variant="outline">{statsData?.completedInterviews || 0}</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="applications" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <ApplicationsChart
              applications={applicationsData?.applications || []}
              chartData={applicationsData?.chartData || []}
            />
            <RecentActivity recentActivity={applicationsData?.recentActivity || []} />
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <PerformanceMetrics
            applications={applicationsData?.applications || []}
            jobs={jobsData?.jobs || []}
            performanceData={performanceData}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
