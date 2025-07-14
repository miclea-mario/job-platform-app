import { Link } from '@components';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@components/ui/dialog';
import { INTERVIEW_REPORT_STATUS } from '@constants/interview';
import { formatDate } from '@functions';
import { AlertTriangle, Calendar, FileText, Star, TrendingUp, User, Video } from 'lucide-react';

const InterviewDetailsModal = ({ application, isOpen, onClose }) => {
  if (!application) return null;

  const { interview, user, job } = application;

  const getInitials = (name) => {
    return (
      name
        ?.split(' ')
        .map((word) => word[0])
        .join('')
        .toUpperCase() || '?'
    );
  };

  const isInterviewToday = () => {
    const interviewDate = new Date(interview?.date);
    const today = new Date();
    return interviewDate.toDateString() === today.toDateString();
  };

  const isInterviewUpcoming = () => {
    const interviewDate = new Date(interview?.date);
    const now = new Date();
    return interviewDate > now;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            Interview Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          {/* Candidate Section */}
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
            <Avatar className="h-12 w-12 flex-shrink-0">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback className="text-sm font-semibold bg-blue-100 text-blue-600">
                {getInitials(user?.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 truncate">{user?.name}</h3>
              <p className="text-sm text-blue-600">{job?.title}</p>
            </div>
            {isInterviewToday() && (
              <Badge className="bg-green-100 text-green-800 text-xs">Today</Badge>
            )}
          </div>

          {/* Interview Schedule */}
          <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-4 w-4 text-amber-700" />
              <span className="text-sm font-medium text-amber-700">Interview Schedule</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-amber-600">Date</p>
                <p className="text-sm font-medium text-amber-900">
                  {formatDate(interview?.date, 'MMM dd, yyyy')}
                </p>
              </div>
              <div>
                <p className="text-xs text-amber-600">Time</p>
                <p className="text-sm font-medium text-amber-900">{interview?.time}</p>
              </div>
            </div>
          </div>

          {/* Interview Report Status */}
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="h-4 w-4 text-gray-700" />
              <span className="text-sm font-medium text-gray-700">AI Report Status</span>
            </div>
            <div className="flex items-center gap-2">
              {interview?.reportStatus === INTERVIEW_REPORT_STATUS.GENERATED && (
                <Badge className="bg-green-100 text-green-800 text-xs">Report Available</Badge>
              )}
              {interview?.reportStatus === INTERVIEW_REPORT_STATUS.PENDING && (
                <Badge className="bg-yellow-100 text-yellow-800 text-xs">Report Pending</Badge>
              )}
              {interview?.reportStatus === INTERVIEW_REPORT_STATUS.FAILED && (
                <Badge className="bg-red-100 text-red-800 text-xs">Report Failed</Badge>
              )}
              {!interview?.reportStatus && (
                <Badge className="bg-gray-100 text-gray-800 text-xs">No Report</Badge>
              )}
            </div>
          </div>

          {/* Interview Report */}
          {interview?.report && interview.reportStatus === 'Generated' && (
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="h-4 w-4 text-slate-700" />
                <span className="text-sm font-medium text-slate-700">Interview Report</span>
                <Badge className="bg-slate-100 text-slate-800 text-xs ml-auto">
                  Score: {interview.report.overallScore}/100
                </Badge>
              </div>

              {/* Overall Summary */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-slate-900 mb-2">Summary</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{interview.report.summary}</p>
              </div>

              {/* Skills Assessment */}
              <div className="grid grid-cols-1 gap-3 mb-4">
                <div className="flex items-center justify-between p-2 bg-white rounded border">
                  <div className="flex items-center gap-2">
                    <User className="h-3 w-3 text-blue-500" />
                    <span className="text-xs font-medium text-slate-700">Communication</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {interview.report.communicationSkills.score}/100
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-2 bg-white rounded border">
                  <div className="flex items-center gap-2">
                    <Star className="h-3 w-3 text-yellow-500" />
                    <span className="text-xs font-medium text-slate-700">Technical Skills</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {interview.report.technicalSkills.score}/100
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-2 bg-white rounded border">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-3 w-3 text-green-500" />
                    <span className="text-xs font-medium text-slate-700">Behavioral</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {interview.report.behavioralAssessment.score}/100
                  </Badge>
                </div>
              </div>

              {/* Key Strengths */}
              {interview.report.keyStrengths && interview.report.keyStrengths.length > 0 && (
                <div className="mb-3">
                  <h4 className="text-sm font-medium text-slate-900 mb-2 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3 text-green-600" />
                    Key Strengths
                  </h4>
                  <ul className="space-y-1">
                    {interview.report.keyStrengths.slice(0, 3).map((strength, index) => (
                      <li key={index} className="text-xs text-slate-600 flex items-start gap-1">
                        <span className="text-green-500 mt-0.5">•</span>
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Areas for Improvement */}
              {interview.report.areasForImprovement &&
                interview.report.areasForImprovement.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-slate-900 mb-2 flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3 text-amber-600" />
                      Areas for Improvement
                    </h4>
                    <ul className="space-y-1">
                      {interview.report.areasForImprovement.slice(0, 3).map((area, index) => (
                        <li key={index} className="text-xs text-slate-600 flex items-start gap-1">
                          <span className="text-amber-500 mt-0.5">•</span>
                          <span>{area}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2">
            <Link
              href={`/interview/${application._id}`}
              className="flex-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                className="w-full bg-green-600 hover:bg-green-700"
                size="sm"
                disabled={!isInterviewUpcoming()}
              >
                <Video className="h-4 w-4 mr-2" />
                {isInterviewToday() ? 'Join Now' : 'Join Interview'}
              </Button>
            </Link>
            <Link href={`/company/applications?selected=${application._id}`}>
              <Button variant="outline" size="sm">
                <User className="h-4 w-4 mr-1" />
                View Application
              </Button>
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InterviewDetailsModal;
