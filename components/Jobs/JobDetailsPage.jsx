import { applyJob } from '@api/user';
import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { APPLICATION_STATUS } from '@constants/application';
import { formatDate } from '@functions';
import { useMutation } from '@hooks';
import { isFunction } from 'lodash';
import {
  ArrowLeft,
  Bookmark,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle,
  Clock,
  Clock4,
  DollarSign,
  MapPin,
  Share2,
  Star,
  XCircle,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import AIMatchReport from './AIMatchReport';

const JobDetailsPage = ({ job, refetch }) => {
  const mutation = useMutation(applyJob, {
    successCallback: () => {
      if (isFunction(refetch)) {
        refetch();
      }
    },
  });

  const handleApply = () => {
    mutation.mutateAsync(job._id);
  };

  const getApplicationStatusBadge = () => {
    if (!job.application) return null;

    const statusConfig = {
      pending: {
        variant: 'secondary',
        icon: Clock4,
        text: 'Application Pending',
      },
      accepted: {
        variant: 'success',
        icon: CheckCircle,
        text: 'Application Accepted',
      },
      rejected: {
        variant: 'destructive',
        icon: XCircle,
        text: 'Application Rejected',
      },
    };

    const status = statusConfig[job.application.status];
    if (!status) return null;

    const Icon = status.icon;
    return (
      <Badge variant={status.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {status.text}
      </Badge>
    );
  };

  const renderApplyButton = () => {
    if (job.application) {
      if (job.application.status === APPLICATION_STATUS.ACCEPTED) {
        return (
          <Button size="lg" variant="outline" className="cursor-not-allowed" disabled>
            Application Accepted
          </Button>
        );
      }
      if (job.application.status === APPLICATION_STATUS.REJECTED) {
        return (
          <Button size="lg" variant="outline" className="cursor-not-allowed" disabled>
            Application Rejected
          </Button>
        );
      }
      return (
        <Button size="lg" variant="outline" className="cursor-not-allowed" disabled>
          {job.application.status}
        </Button>
      );
    }

    return (
      <Button
        size="lg"
        className="bg-gradient-to-r from-primary via-primary/90 to-primary hover:from-primary/90 hover:via-primary hover:to-primary/90"
        onClick={handleApply}
      >
        Apply Now
      </Button>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-6">
            <Link
              href="/jobs"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold">{job.title}</h1>
              {getApplicationStatusBadge()}
            </div>
          </div>

          <div className="flex items-start gap-6">
            <div className="w-20 h-20 relative rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
              {job.company?.avatar ? (
                <Image
                  src={job.company.avatar}
                  alt={job.company.name}
                  fill
                  className="object-contain"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-gray-400">
                  {job.company?.name?.[0]}
                </div>
              )}
            </div>

            <div className="flex-1">
              <h2 className="text-2xl font-semibold">{job.company?.name}</h2>
              <div className="flex items-center gap-2 text-muted-foreground mt-2">
                <MapPin className="h-4 w-4" />
                <span>{job.city}</span>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-2 text-sm">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <span>{job.employmentType}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span>{job.workplaceType}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{job.numberOfOpenings} openings</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Bookmark className="h-4 w-4" />
              </Button>
              {renderApplyButton()}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="col-span-2 space-y-8">
            {/* Job Description */}
            <section className="space-y-4">
              <h3 className="text-xl font-semibold">Job Description</h3>
              <div className="prose prose-sm max-w-none">
                <p className="text-muted-foreground whitespace-pre-wrap">{job.description}</p>
              </div>
            </section>

            {/* Required Skills */}
            <section className="space-y-4">
              <h3 className="text-xl font-semibold">Required Skills</h3>
              <div className="flex flex-wrap gap-2">
                {job.requiredSkills?.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-sm px-3 py-1">
                    {skill}
                  </Badge>
                ))}
              </div>
            </section>

            {/* Job Details */}
            <section className="space-y-4">
              <h3 className="text-xl font-semibold">Job Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-card rounded-lg border">
                  <Star className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Experience Level</p>
                    <p className="font-medium">{job.experienceLevel}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-card rounded-lg border">
                  <Briefcase className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Employment Type</p>
                    <p className="font-medium">{job.employmentType}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-card rounded-lg border">
                  <Building2 className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Workplace Type</p>
                    <p className="font-medium">{job.workplaceType}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-card rounded-lg border">
                  <DollarSign className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Salary Range</p>
                    <p className="font-medium">
                      {job.salary?.min?.toLocaleString()} - {job.salary?.max?.toLocaleString()} €/m
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-card rounded-lg border">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Posted Date</p>
                    <p className="font-medium">{formatDate(job.createdAt, 'dd MMM yyyy')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-card rounded-lg border">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Openings</p>
                    <p className="font-medium">{job.numberOfOpenings} positions</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Company Info */}
            <section className="space-y-4">
              <h3 className="text-xl font-semibold">About {job.company?.name}</h3>
              <div className="prose prose-sm max-w-none">
                <p className="text-muted-foreground">{job.company?.description}</p>
              </div>
            </section>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            {/* AI Match Score */}
            <AIMatchReport jobId={job._id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
