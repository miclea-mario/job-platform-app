import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@components/ui/dialog';
import { Progress } from '@components/ui/progress';
import { Separator } from '@components/ui/separator';
import {
  Briefcase,
  Building2,
  CheckCircle2,
  Clock,
  GraduationCap,
  MapPin,
  Sparkles,
  XCircle,
} from 'lucide-react';
import Image from 'next/image';

const JobDetailsModal = ({ job, isOpen, onClose, aiMatch }) => {
  if (!job) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{job.title}</DialogTitle>
        </DialogHeader>

        <div className="mt-6 space-y-6">
          {/* Company Info */}
          <div className="flex items-start gap-4">
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
            <div>
              <h3 className="font-semibold text-lg">{job.company?.name}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                <MapPin className="h-4 w-4" />
                <span>{job.city}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Job Details */}
          <div className="space-y-4">
            <h3 className="font-semibold">Job Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <span>{job.employmentType}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <span>{job.workplaceType}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
                <span>{job.experienceLevel}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{job.numberOfOpenings} openings</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* AI Match Score */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">AI Match Score</h3>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="font-semibold text-primary">{aiMatch?.score}%</span>
              </div>
            </div>
            <Progress value={aiMatch?.score} className="h-2" />

            <div className="space-y-3">
              {aiMatch?.criteria?.map((criterion, index) => (
                <div key={index} className="flex items-start gap-2">
                  {criterion.matched ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-1" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500 mt-1" />
                  )}
                  <div>
                    <p className="text-sm font-medium">{criterion.name}</p>
                    <p className="text-sm text-muted-foreground">{criterion.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Job Description */}
          <div className="space-y-4">
            <h3 className="font-semibold">Job Description</h3>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">{job.description}</p>
          </div>

          <Separator />

          {/* Required Skills */}
          <div className="space-y-4">
            <h3 className="font-semibold">Required Skills</h3>
            <div className="flex flex-wrap gap-2">
              {job.requiredSkills?.map((skill, index) => (
                <Badge key={index} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Apply Button */}
          <Button
            className="w-full bg-gradient-to-r from-primary via-primary/90 to-primary hover:from-primary/90 hover:via-primary hover:to-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl"
            size="lg"
          >
            Apply Now
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JobDetailsModal;
