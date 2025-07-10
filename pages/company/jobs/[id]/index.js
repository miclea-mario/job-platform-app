import { updateJobVisibility } from '@api/company';
import { checkAuth, withAuth } from '@auth';
import { DashboardLayout, Loading } from '@components';
import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card';
import { Separator } from '@components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs';
import { formatDate } from '@functions';
import { useMutation, useQuery } from '@hooks';
import { toaster } from '@lib';
import {
  Briefcase,
  Building2,
  Calendar,
  Clock,
  DollarSign,
  Edit,
  Eye,
  EyeOff,
  GraduationCap,
  MapPin,
  Star,
  TrendingUp,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Page = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: job, status, refetch } = useQuery(`company/jobs/${id}`);
  const { data: applications } = useQuery(`company/jobs/${id}/applications`);

  const updateVisibilityMutation = useMutation(updateJobVisibility, {
    onSuccess: () => {
      refetch();
      toaster.success(job.isActive ? 'Job deactivated successfully' : 'Job activated successfully');
    },
  });

  const handleToggleVisibility = () => {
    updateVisibilityMutation.mutateAsync({ id, isActive: !job.isActive });
  };

  if (status === 'loading') {
    return (
      <DashboardLayout title="Job Details" role="company">
        <Loading />
      </DashboardLayout>
    );
  }

  if (status === 'error' || !job) {
    return (
      <DashboardLayout title="Job Details" role="company">
        <div className="text-center py-8">
          <p className="text-muted-foreground">Job not found</p>
        </div>
      </DashboardLayout>
    );
  }

  const applicationStats = {
    total: applications?.length || 0,
    pending: applications?.filter((app) => app.status === 'pending')?.length || 0,
    accepted: applications?.filter((app) => app.status === 'accepted')?.length || 0,
    rejected: applications?.filter((app) => app.status === 'rejected')?.length || 0,
  };

  return (
    <DashboardLayout title="Job Details" role="company">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold">{job.title}</h1>
              <Badge variant={job.isActive ? 'accepted' : 'secondary'}>
                {job.isActive ? 'Active' : 'Inactive'}
              </Badge>
            </div>
            <div className="flex items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{job.city}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>Posted {formatDate(job.createdAt, 'MMM dd, yyyy')}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>Deadline {formatDate(job.deadlineDate, 'MMM dd, yyyy')}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={handleToggleVisibility}>
              {job.isActive ? (
                <>
                  <EyeOff className="h-4 w-4 mr-2" />
                  Deactivate
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4 mr-2" />
                  Activate
                </>
              )}
            </Button>
            <Button variant="outline" asChild>
              <Link href={`/company/jobs/${id}/edit`}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Job
              </Link>
            </Button>
            <Button asChild>
              <Link href={`/company/jobs/${id}/applications`}>
                <Users className="h-4 w-4 mr-2" />
                View Applications
              </Link>
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{applicationStats.total}</div>
              <p className="text-xs text-muted-foreground">
                {job.numberOfOpenings} positions available
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{applicationStats.pending}</div>
              <p className="text-xs text-muted-foreground">Need attention</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Accepted</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{applicationStats.accepted}</div>
              <p className="text-xs text-muted-foreground">Successfully hired</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="requirements">Requirements</TabsTrigger>
            <TabsTrigger value="details">Job Details</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Job Description */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Job Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-sm max-w-none">
                      <p className="text-muted-foreground whitespace-pre-wrap">{job.description}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Required Skills */}
                <Card>
                  <CardHeader>
                    <CardTitle>Required Skills</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {job.requiredSkills?.map((skill, index) => (
                        <Badge key={index} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Preferred Skills */}
                {job.preferredSkills?.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Preferred Skills</CardTitle>
                      <CardDescription>Nice to have skills</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {job.preferredSkills?.map((skill, index) => (
                          <Badge key={index} variant="outline">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Job Quick Info */}
                <Card>
                  <CardHeader>
                    <CardTitle>Job Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Star className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Experience Level</p>
                        <p className="font-medium">{job.experienceLevel}</p>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-center gap-3">
                      <Briefcase className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Employment Type</p>
                        <p className="font-medium">{job.employmentType}</p>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-center gap-3">
                      <Building2 className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Workplace Type</p>
                        <p className="font-medium">{job.workplaceType}</p>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-center gap-3">
                      <GraduationCap className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Minimum Qualification</p>
                        <p className="font-medium">{job.minimumQualification}</p>
                      </div>
                    </div>
                    {job.salary?.min > 0 && (
                      <>
                        <Separator />
                        <div className="flex items-center gap-3">
                          <DollarSign className="h-5 w-5 text-primary" />
                          <div>
                            <p className="text-sm text-muted-foreground">Salary Range</p>
                            <p className="font-medium">
                              {job.salary.min.toLocaleString()} - {job.salary.max.toLocaleString()}{' '}
                              €/month
                            </p>
                          </div>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>

                {/* Benefits */}
                {job.benefits?.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Benefits</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {job.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="requirements" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="flex-col">
                  <CardTitle>Responsibilities</CardTitle>
                  <CardDescription>Key duties and responsibilities</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {job.responsibilities?.map((responsibility, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm">{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="details" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Job Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Department</p>
                      <p className="font-medium">{job.departament || 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Number of Openings</p>
                      <p className="font-medium">{job.numberOfOpenings}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Posted Date</p>
                      <p className="font-medium">{formatDate(job.createdAt, 'MMM dd, yyyy')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Application Deadline</p>
                      <p className="font-medium">{formatDate(job.deadlineDate, 'MMM dd, yyyy')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Last Updated</p>
                      <p className="font-medium">{formatDate(job.updatedAt, 'MMM dd, yyyy')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <Badge variant={job.isActive ? 'accepted' : 'secondary'}>
                        {job.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Application Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Total Applications</span>
                      <span className="font-medium">{applicationStats.total}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Pending Review</span>
                      <Badge variant="secondary">{applicationStats.pending}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Accepted</span>
                      <Badge variant="accepted">{applicationStats.accepted}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Rejected</span>
                      <Badge variant="destructive">{applicationStats.rejected}</Badge>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Positions Filled</span>
                    <span className="font-medium">
                      {applicationStats.accepted} / {job.numberOfOpenings}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
