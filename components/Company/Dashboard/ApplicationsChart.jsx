'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@components/ui/chart';
import { TrendingUp, Users } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

const ApplicationsChart = ({ applications = [], chartData = [] }) => {
  // Process applications data for charts
  const processApplicationsData = () => {
    const statusCounts = applications.reduce((acc, app) => {
      acc[app.status] = (acc[app.status] || 0) + 1;
      return acc;
    }, {});

    return [
      { status: 'Pending', count: statusCounts['Pending'] || 0, fill: 'var(--chart-1)' },
      { status: 'Accepted', count: statusCounts['Accepted'] || 0, fill: 'var(--chart-2)' },
      { status: 'Rejected', count: statusCounts['Rejected'] || 0, fill: 'var(--chart-3)' },
      { status: 'Interviewed', count: statusCounts['Interviewed'] || 0, fill: 'var(--chart-4)' },
      {
        status: 'Pending Interview',
        count: statusCounts['Pending Interview'] || 0,
        fill: 'var(--chart-5)',
      },
    ].filter((item) => item.count > 0);
  };

  // Use provided chartData or process monthly data
  const processMonthlyData = () => {
    if (chartData && chartData.length > 0) {
      return chartData.map((item) => ({
        month: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        applications: item.total || 0,
        pending: item.pending || 0,
        accepted: item.accepted || 0,
        rejected: item.rejected || 0,
      }));
    }
    const monthlyData = {};
    const currentDate = new Date();

    // Initialize last 6 months
    for (let i = 5; i >= 0; i--) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      const monthKey = date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
      monthlyData[monthKey] = 0;
    }

    // Count applications by month
    applications.forEach((app) => {
      if (app.createdAt) {
        const date = new Date(app.createdAt);
        const monthKey = date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
        if (Object.prototype.hasOwnProperty.call(monthlyData, monthKey)) {
          monthlyData[monthKey]++;
        }
      }
    });

    return Object.entries(monthlyData).map(([month, count]) => ({
      month,
      applications: count,
    }));
  };

  const chartConfig = {
    pending: {
      label: 'Pending',
      color: 'hsl(var(--chart-1))',
    },
    reviewed: {
      label: 'Reviewed',
      color: 'hsl(var(--chart-2))',
    },
    interview: {
      label: 'Interview',
      color: 'hsl(var(--chart-3))',
    },
    hired: {
      label: 'Hired',
      color: 'hsl(var(--chart-4))',
    },
    rejected: {
      label: 'Rejected',
      color: 'hsl(var(--chart-5))',
    },
    applications: {
      label: 'Applications',
      color: 'hsl(var(--chart-1))',
    },
  };

  const statusData = processApplicationsData();
  const monthlyData = processMonthlyData();

  return (
    <div className="space-y-4">
      {/* Applications by Status */}
      <Card>
        <CardHeader className="flex-col">
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Applications by Status
          </CardTitle>
          <CardDescription>Current distribution of application statuses</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <BarChart data={statusData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="status" tickLine={false} axisLine={false} className="text-xs" />
              <YAxis tickLine={false} axisLine={false} className="text-xs" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="count" radius={[4, 4, 0, 0]} fill="var(--chart-1)" />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Monthly Applications Trend */}
      <Card>
        <CardHeader className="flex-col">
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Applications Trend
          </CardTitle>
          <CardDescription>Applications received over the last 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} className="text-xs" />
              <YAxis tickLine={false} axisLine={false} className="text-xs" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="applications" radius={[4, 4, 0, 0]} fill="var(--chart-2)" />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplicationsChart;
