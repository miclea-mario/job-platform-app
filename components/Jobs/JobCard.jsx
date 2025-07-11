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
      <Card className="p-6 hover:shadow-md transition-shadow">
        <div className="flex items-start gap-6">
          {/* Company Logo */}
          <div className="w-16 h-16 relative rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
            {job.company?.avatar ? (
              <Image
                src={job.company.avatar}
                alt={job.company.name}
                fill
                className="object-contain"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xl font-bold text-gray-400">
                {job.company?.name?.[0]}
              </div>
            )}
          </div>

          {/* Job Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold truncate">
                  <Link href={`/jobs/${job._id}`} className="hover:text-primary">
                    {job.title}
                  </Link>
                </h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                  <Building2 className="h-4 w-4" />
                  <span>{job.company?.name}</span>
                  <span>•</span>
                  <MapPin className="h-4 w-4" />
                  <span>{job.city}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 mt-4">
              <Badge variant="secondary">{job.employmentType}</Badge>
              <Badge variant="secondary">{job.workplaceType}</Badge>
              <Badge variant="secondary">{job.experienceLevel}</Badge>
              {job.salary?.min > 0 && (
                <Badge variant="outline">
                  {job.salary.min.toLocaleString()} - {job.salary.max.toLocaleString()} €/m
                </Badge>
              )}
            </div>

            <div className="flex items-center gap-6 mt-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Briefcase className="h-4 w-4" />
                <span>{job.numberOfOpenings} openings</span>
              </div>
              <div className="flex items-center gap-1">
                <GraduationCap className="h-4 w-4" />
                <span>{job.minimumQualification}</span>
              </div>
              <span>•</span>
              <span>{diffDays} days ago</span>
            </div>
          </div>

          {/* Action Button */}
          <Link
            className="flex-shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 px-2 rounded-md py-2 text-sm"
            href={`/jobs/${job._id}`}
          >
            Apply Now
          </Link>
        </div>
      </Card>
    </>
  );
};

export default JobCard;
