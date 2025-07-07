import { updateApplicationStatus } from '@api/company';
import {
  AIMatchingReport,
  EducationItem,
  ExperienceItem,
  ScheduleInterviewDialog,
} from '@components/Company/ApplicationDetails';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs';
import { APPLICATION_STATUS } from '@constants/application';
import { formatDate } from '@functions';
import { useMutation } from '@hooks';
import {
  Bookmark,
  Briefcase,
  Calendar,
  Download,
  FileText,
  GraduationCap,
  User,
} from 'lucide-react';
import { useState } from 'react';

const ApplicationDetailsSheet = ({ application, isOpen, hide }) => {
  const [showInterviewDialog, setShowInterviewDialog] = useState(false);

  const mutation = useMutation(updateApplicationStatus, {
    invalidateQueries: 'company/applications',
    successCallback: () => {
      hide();
    },
  });

  const handleClick = (status) => {
    if (status === APPLICATION_STATUS.PENDING_INTERVIEW) {
      setShowInterviewDialog(true);
      return;
    }

    mutation.mutateAsync({
      id: application._id,
      status,
    });
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={hide}>
        <SheetContent className="md:min-w-[50%] overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              Application Details <Badge variant={application.status}>{application.status}</Badge>
            </SheetTitle>
          </SheetHeader>

          <div className="mt-6 space-y-6">
            {/* Applicant */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={application.user.avatar} />
                  <AvatarFallback>{application.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="text-xl font-medium">{application.user.name}</h4>
                  <p className="text-muted-foreground">{application.user.title}</p>
                  <p className="text-muted-foreground">{application.user.location}</p>
                </div>
              </div>
              {/* Actions */}

              <div className="flex gap-2">
                {![APPLICATION_STATUS.PENDING_INTERVIEW, APPLICATION_STATUS.INTERVIEWED].includes(
                  application.status
                ) && (
                  <Button
                    className="flex-1"
                    variant="default"
                    onClick={() => handleClick(APPLICATION_STATUS.PENDING_INTERVIEW)}
                  >
                    Interview
                  </Button>
                )}
                <Button
                  className="flex-1"
                  variant="default"
                  onClick={() => handleClick(APPLICATION_STATUS.ACCEPTED)}
                >
                  Accept
                </Button>
                <Button
                  className="flex-1"
                  variant="destructive"
                  onClick={() => handleClick(APPLICATION_STATUS.REJECTED)}
                >
                  Reject
                </Button>
              </div>
            </div>

            {/* AI Matching Report */}
            <div className="rounded-lg">
              <AIMatchingReport jobMatchReport={application.jobMatchReport} />
            </div>

            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="profile" className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">Profile</span>
                </TabsTrigger>
                <TabsTrigger value="experience" className="flex items-center gap-1">
                  <Briefcase className="h-4 w-4" />
                  <span className="hidden sm:inline">Experience</span>
                </TabsTrigger>
                <TabsTrigger value="education" className="flex items-center gap-1">
                  <GraduationCap className="h-4 w-4" />
                  <span className="hidden sm:inline">Education</span>
                </TabsTrigger>
                <TabsTrigger value="application" className="flex items-center gap-1">
                  <Bookmark className="h-4 w-4" />
                  <span className="hidden sm:inline">Application</span>
                </TabsTrigger>
                <TabsTrigger value="resume" className="flex items-center gap-1">
                  <FileText className="h-4 w-4" />
                  <span className="hidden sm:inline">Resume</span>
                </TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile" className="mt-4 space-y-4">
                <div className="space-y-3">
                  <h3 className="text-lg font-medium">About</h3>
                  <p className="text-muted-foreground">
                    {application.user.bio || 'No bio provided'}
                  </p>
                </div>
              </TabsContent>

              {/* Experience Tab */}
              <TabsContent value="experience" className="mt-4 space-y-4">
                {application.user.experience && application.user.experience.length > 0 ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-muted-foreground" />
                      <h3 className="text-lg font-medium">Experience</h3>
                    </div>
                    <div className="rounded-lg border p-3 divide-y">
                      {application.user.experience.map((exp, index) => (
                        <ExperienceItem key={index} experience={exp} />
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground">No experience information provided</p>
                )}
              </TabsContent>

              {/* Education Tab */}
              <TabsContent value="education" className="mt-4 space-y-4">
                {application.user.education && application.user.education.length > 0 ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-5 w-5 text-muted-foreground" />
                      <h3 className="text-lg font-medium">Education</h3>
                    </div>
                    <div className="rounded-lg border p-3 divide-y">
                      {application.user.education.map((edu, index) => (
                        <EducationItem key={index} education={edu} />
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground">No education information provided</p>
                )}
              </TabsContent>

              {/* Application Tab */}
              <TabsContent value="application" className="mt-4 space-y-4">
                {/* Job */}
                <div className="space-y-3">
                  <h3 className="text-lg font-medium">Applied For</h3>
                  <p>{application.job.title}</p>
                </div>

                {/* Date Applied */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <h3 className="text-lg font-medium">Applied On</h3>
                  </div>
                  <p>{formatDate(new Date(application.createdAt), 'PPP')}</p>
                </div>
              </TabsContent>

              {/* Resume Tab */}
              <TabsContent value="resume" className="mt-4 space-y-4">
                {application.user.resume ? (
                  <div className="space-y-3">
                    <h3 className="text-lg font-medium">Resume</h3>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => window.open(application.user.resume.url, '_blank')}
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        View Resume
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          const link = document.createElement('a');
                          link.href = application.user.resume.url;
                          link.download = application.user.resume.fileName;
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        }}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground">No resume provided</p>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </SheetContent>
      </Sheet>

      {/* Schedule Interview Dialog */}
      <ScheduleInterviewDialog
        isOpen={showInterviewDialog}
        onClose={() => setShowInterviewDialog(false)}
        application={application}
      />
    </>
  );
};

export default ApplicationDetailsSheet;
