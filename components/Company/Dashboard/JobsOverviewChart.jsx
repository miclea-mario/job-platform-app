'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card';
import { ChartContainer, ChartTooltip } from '@components/ui/chart';
import { Briefcase } from 'lucide-react';
import { Cell, Legend, Pie, PieChart } from 'recharts';

const JobsOverviewChart = ({ jobs = [] }) => {
  // Process jobs data
  const processJobsData = () => {
    const activeJobs = jobs.filter((job) => job.isActive).length;
    const inactiveJobs = jobs.filter((job) => !job.isActive).length;

    return [
      {
        name: 'Active Jobs',
        value: activeJobs,
        fill: '#10b981',
        percentage: jobs.length > 0 ? Math.round((activeJobs / jobs.length) * 100) : 0,
      },
      {
        name: 'Inactive Jobs',
        value: inactiveJobs,
        fill: '#f59e0b',
        percentage: jobs.length > 0 ? Math.round((inactiveJobs / jobs.length) * 100) : 0,
      },
    ].filter((item) => item.value > 0);
  };

  // Process jobs by department/category if available
  const processJobsByCategory = () => {
    const categories = jobs.reduce((acc, job) => {
      const category = job.category || job.department || 'General';
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {});

    const colors = [
      '#3b82f6', // Blue
      '#ef4444', // Red
      '#8b5cf6', // Purple
      '#f59e0b', // Amber
      '#10b981', // Emerald
      '#ec4899', // Pink
    ];

    return Object.entries(categories).map(([category, count], index) => ({
      name: category,
      value: count,
      fill: colors[index % colors.length],
    }));
  };

  const chartConfig = {
    active: {
      label: 'Active Jobs',
      color: '#10b981', // Emerald green
    },
    inactive: {
      label: 'Inactive Jobs',
      color: '#f59e0b', // Amber
    },
  };

  const jobsStatusData = processJobsData();
  const jobsCategoryData = processJobsByCategory();

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border bg-background p-2 shadow-md">
          <p className="label font-medium">{payload[0].name}</p>
          <p className="desc text-sm text-muted-foreground">
            {payload[0].value} jobs ({payload[0].payload.percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    if (percent < 0.05) return null; // Don't show label for very small segments

    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        className="text-xs font-medium"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="space-y-4">
      {/* Jobs Status Distribution */}
      <Card>
        <CardHeader className="flex-col">
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            Jobs Overview
          </CardTitle>
          <CardDescription>Distribution of active vs inactive job postings</CardDescription>
        </CardHeader>
        <CardContent>
          {jobsStatusData.length > 0 ? (
            <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
              <PieChart>
                <Pie
                  data={jobsStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {jobsStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <ChartTooltip content={<CustomTooltip />} />
                <Legend
                  wrapperStyle={{ paddingTop: '20px' }}
                  formatter={(value, entry) => <span style={{ color: entry.color }}>{value}</span>}
                />
              </PieChart>
            </ChartContainer>
          ) : (
            <div className="flex items-center justify-center h-[250px] text-muted-foreground">
              <div className="text-center">
                <Briefcase className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No jobs data available</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Jobs by Category */}
      {jobsCategoryData.length > 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Jobs by Category</CardTitle>
            <CardDescription>Distribution of jobs across different categories</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
              <PieChart>
                <Pie
                  data={jobsCategoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {jobsCategoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <ChartTooltip />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default JobsOverviewChart;
