import { Badge } from '@components/ui/badge';
import { Card } from '@components/ui/card';
import { Briefcase, Building2, GraduationCap, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const JobCard = ({ job }) => {
  const postedDate = new Date(job.createdAt);
  const now = new Date();
  const diffTime = Math.abs(now - postedDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return (
    <>
      <Card className="p-4 lg:p-6 hover:shadow-md transition-shadow">
        <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-6">
          {/* Header Section - Logo, Title, Company */}
          <div className="flex items-start gap-3 lg:gap-4 flex-1">
            {/* Company Logo */}
            <div className="w-12 h-12 lg:w-16 lg:h-16 relative rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
              {job.company?.avatar ? (
                <Image
                  src={job.company.avatar}
                  alt={job.company.name}
                  fill
                  className="object-contain"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-lg lg:text-xl font-bold text-gray-400">
                  {job.company?.name?.[0]}
                </div>
              )}
            </div>

            {/* Job Info */}
            <div className="flex-1 min-w-0">
              <h3 className="text-base lg:text-lg font-semibold leading-tight">
                <Link href={`/jobs/${job._id}`} className="hover:text-primary">
                  {job.title}
                </Link>
              </h3>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-sm text-muted-foreground mt-1">
                <div className="flex items-center gap-1">
                  <Building2 className="h-4 w-4" />
                  <span>{job.company?.name}</span>
                </div>
                <span className="hidden sm:inline">•</span>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{job.city}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Button - Hidden on mobile, visible on desktop */}
          <Link
            className="hidden lg:flex flex-shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 px-3 lg:px-4 rounded-md py-2 text-sm font-medium text-center self-start lg:self-auto"
            href={`/jobs/${job._id}`}
          >
            Apply Now
          </Link>
        </div>

        {/* Tags Section */}
        <div className="flex flex-wrap items-center gap-2 mt-3 lg:mt-4">
          <Badge variant="secondary" className="text-xs">
            {job.employmentType}
          </Badge>
          <Badge variant="secondary" className="text-xs">
            {job.workplaceType}
          </Badge>
          <Badge variant="secondary" className="text-xs">
            {job.experienceLevel}
          </Badge>
          {job.salary?.min > 0 && (
            <Badge variant="outline" className="text-xs">
              {job.salary.min.toLocaleString()} - {job.salary.max.toLocaleString()} €/m
            </Badge>
          )}
        </div>

        {/* Additional Info Section */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 mt-3 lg:mt-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Briefcase className="h-4 w-4" />
              <span>{job.numberOfOpenings} openings</span>
            </div>
            <div className="flex items-center gap-1">
              <GraduationCap className="h-4 w-4" />
              <span className="truncate">{job.minimumQualification}</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <span>•</span>
            <span>{diffDays} days ago</span>
          </div>
        </div>
      </Card>
    </>
  );
};

export default JobCard;
