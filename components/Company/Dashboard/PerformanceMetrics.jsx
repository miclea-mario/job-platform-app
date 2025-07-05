'use client';

import { Badge } from '@components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@components/ui/chart';
import { Progress } from '@components/ui/progress';
import { CheckCircle, Clock, Target, TrendingUp, Users } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';

const PerformanceMetrics = ({ applications = [], jobs = [], performanceData = null }) => {
  // Use API data if available, otherwise calculate from props
  const getMetrics = () => {
    if (performanceData?.metrics) {
      return {
        applicationToInterview: performanceData.metrics.interviewRate || 0,
        interviewToHire: performanceData.metrics.conversionRate || 0,
        overallConversion: performanceData.metrics.hireRate || 0,
        interviewCompletion: performanceData.metrics.completionRate || 0,
        totalApplications: performanceData.metrics.totalApplications || 0,
        totalInterviews: performanceData.metrics.totalInterviews || 0,
        averageTimeToInterview: performanceData.metrics.averageTimeToInterview || 0,
      };
    }

    // Fallback to calculating from props
    return calculateConversionRates();
  };

  // Calculate conversion rates (fallback method)
  const calculateConversionRates = () => {
    const totalApplications = applications.length;
    const hiredCandidates = applications.filter((app) => app.status === 'Accepted').length;

    return {
      applicationToInterview: 0,
      interviewToHire: 0,
      overallConversion: totalApplications > 0 ? (hiredCandidates / totalApplications) * 100 : 0,
      interviewCompletion: 0,
      totalApplications,
      totalInterviews: 0,
      averageTimeToInterview: 0,
    };
  };

  const metrics = getMetrics();

  // Calculate average time to hire (mock data for demo)
  const calculateTimeMetrics = () => {
    return {
      averageTimeToHire: 14, // days
      averageTimeToInterview: 7, // days
      averageResponseTime: 2, // days
    };
  };

  // Process hiring funnel data
  const processHiringFunnelData = () => {
    if (performanceData?.chartData && performanceData.chartData.length > 0) {
      // Use API data if available - convert to funnel format
      const totalApps = performanceData.chartData.reduce(
        (sum, item) => sum + (item.applications || 0),
        0
      );
      const totalInterviews = performanceData.chartData.reduce(
        (sum, item) => sum + (item.interviews || 0),
        0
      );
      const totalHires = performanceData.chartData.reduce(
        (sum, item) => sum + (item.hires || 0),
        0
      );

      return [
        { stage: 'Applications', count: totalApps, percentage: 100 },
        {
          stage: 'Interviews',
          count: totalInterviews,
          percentage: totalApps > 0 ? (totalInterviews / totalApps) * 100 : 0,
        },
        {
          stage: 'Hires',
          count: totalHires,
          percentage: totalApps > 0 ? (totalHires / totalApps) * 100 : 0,
        },
      ];
    }

    const totalApplications = applications.length;
    const reviewedApplications = applications.filter((app) => app.status !== 'Pending').length;
    const hiredCandidates = applications.filter((app) => app.status === 'Accepted').length;

    return [
      { stage: 'Applications', count: totalApplications, percentage: 100 },
      {
        stage: 'Reviewed',
        count: reviewedApplications,
        percentage: totalApplications > 0 ? (reviewedApplications / totalApplications) * 100 : 0,
      },
      {
        stage: 'Hired',
        count: hiredCandidates,
        percentage: totalApplications > 0 ? (hiredCandidates / totalApplications) * 100 : 0,
      },
    ];
  };

  // Process performance trend data
  const processPerformanceTrend = () => {
    if (performanceData?.chartData) {
      return performanceData.chartData.map((item) => ({
        date: item.date,
        applications: item.applications || 0,
        interviews: item.interviews || 0,
        hires: item.hires || 0,
        hireRate: item.applications > 0 ? (item.hires / item.applications) * 100 : 0,
      }));
    }

    // Fallback mock data
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    return months.map((month, index) => ({
      month,
      hireRate: Math.max(5, 25 + Math.sin(index) * 10 + Math.random() * 5),
      responseTime: Math.max(1, 3 + Math.sin(index + 1) * 1 + Math.random() * 1),
      satisfaction: Math.max(70, 85 + Math.sin(index + 2) * 10 + Math.random() * 5),
    }));
  };

  const chartConfig = {
    hireRate: {
      label: 'Hire Rate (%)',
      color: 'hsl(var(--chart-1))',
    },
    responseTime: {
      label: 'Response Time (days)',
      color: 'hsl(var(--chart-2))',
    },
    satisfaction: {
      label: 'Satisfaction Score',
      color: 'hsl(var(--chart-3))',
    },
  };

  const conversionRates = metrics;
  const timeMetrics = calculateTimeMetrics();
  const hiringFunnelData = processHiringFunnelData();
  const performanceTrendData = processPerformanceTrend();

  const MetricCard = ({
    icon: Icon,
    title,
    value,
    subtitle,
    color = 'text-blue-600',
    bgColor = 'bg-blue-50',
  }) => (
    <div className={`p-4 rounded-lg border ${bgColor}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-full bg-white`}>
            <Icon className={`h-5 w-5 ${color}`} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-lg font-bold">{value}</p>
            {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Key Performance Indicators */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          icon={Target}
          title="Hire Rate"
          value={`${conversionRates.overallConversion.toFixed(1)}%`}
          subtitle="Overall conversion"
          color="text-green-600"
          bgColor="bg-green-50"
        />
        <MetricCard
          icon={Clock}
          title="Avg. Time to Hire"
          value={`${timeMetrics.averageTimeToHire} days`}
          subtitle="From application to offer"
          color="text-blue-600"
          bgColor="bg-blue-50"
        />
        <MetricCard
          icon={Users}
          title="Interview Rate"
          value={`${conversionRates.applicationToInterview.toFixed(1)}%`}
          subtitle="Applications to interviews"
          color="text-purple-600"
          bgColor="bg-purple-50"
        />
        <MetricCard
          icon={CheckCircle}
          title="Interview Success"
          value={`${conversionRates.interviewToHire.toFixed(1)}%`}
          subtitle="Interviews to hires"
          color="text-orange-600"
          bgColor="bg-orange-50"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Hiring Funnel */}
        <Card>
          <CardHeader className="flex-col">
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Hiring Funnel
            </CardTitle>
            <CardDescription>Conversion rates through the hiring process</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {hiringFunnelData.map((stage) => (
              <div key={stage.stage} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{stage.stage}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{stage.count}</span>
                    <Badge variant="outline" className="text-xs">
                      {(stage.percentage || 0).toFixed(0)}%
                    </Badge>
                  </div>
                </div>
                <Progress value={stage.percentage || 0} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Performance Trends */}
        <Card>
          <CardHeader className="flex-col">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Performance Trends
            </CardTitle>
            <CardDescription>Key metrics over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
              <AreaChart
                data={performanceTrendData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorHireRate" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="colorSatisfaction" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--chart-3)" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="var(--chart-3)" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tickLine={false} axisLine={false} className="text-xs" />
                <YAxis tickLine={false} axisLine={false} className="text-xs" />
                <CartesianGrid strokeDasharray="3 3" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="hireRate"
                  stroke="var(--chart-1)"
                  fillOpacity={1}
                  fill="url(#colorHireRate)"
                />
                <Area
                  type="monotone"
                  dataKey="satisfaction"
                  stroke="var(--chart-3)"
                  fillOpacity={1}
                  fill="url(#colorSatisfaction)"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Additional Metrics */}
      <Card>
        <CardHeader className="flex-col">
          <CardTitle>Additional Metrics</CardTitle>
          <CardDescription>Other important performance indicators</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {timeMetrics.averageResponseTime}
              </div>
              <div className="text-sm text-muted-foreground">Avg. Response Time (days)</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {conversionRates.interviewCompletion.toFixed(0)}%
              </div>
              <div className="text-sm text-muted-foreground">Interview Completion Rate</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {jobs.filter((job) => job.isActive).length}
              </div>
              <div className="text-sm text-muted-foreground">Active Job Postings</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceMetrics;
