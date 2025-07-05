'use client';

import { Badge } from '@components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card';
import { ScrollArea } from '@components/ui/scroll-area';
import { formatDistanceToNow } from 'date-fns';
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  Clock,
  Eye,
  User,
  UserCheck,
  XCircle,
} from 'lucide-react';

const RecentActivity = ({ recentActivity = [], applications = [] }) => {
  // Use provided recentActivity if available, otherwise process from applications
  const processRecentActivities = () => {
    if (recentActivity && recentActivity.length > 0) {
      return recentActivity.map((activity) => ({
        id: activity.id,
        type: 'application',
        action: 'applied',
        status: activity.status,
        candidate: { name: activity.applicantName, email: activity.applicantEmail },
        job: { title: activity.jobTitle },
        timestamp: activity.appliedAt,
        timeAgo: activity.timeAgo,
      }));
    }
    const activities = [];

    // Add application activities
    applications.forEach((app) => {
      activities.push({
        id: app._id || Math.random(),
        type: 'application',
        action: 'applied',
        status: app.status,
        candidate: app.user || { name: 'Unknown Candidate' },
        job: app.job || { title: 'Unknown Position' },
        timestamp: app.createdAt || new Date(),
        description: `New application received for ${app.job?.title || 'Unknown Position'}`,
      });

      // Add status change activities if status was updated recently
      if (app.status !== 'pending' && app.updatedAt && app.updatedAt !== app.createdAt) {
        activities.push({
          id: `${app._id}-status` || Math.random(),
          type: 'status_change',
          action: 'status_updated',
          status: app.status,
          candidate: app.user || { name: 'Unknown Candidate' },
          job: app.job || { title: 'Unknown Position' },
          timestamp: app.updatedAt,
          description: `Application status changed to ${app.status}`,
        });
      }
    });

    // Sort by timestamp (most recent first) and take the last 10
    return activities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0, 10);
  };

  const getActivityIcon = (type, status) => {
    switch (type) {
      case 'application':
        return <User className="h-4 w-4" />;
      case 'status_change':
        switch (status) {
          case 'hired':
            return <CheckCircle className="h-4 w-4 text-green-600" />;
          case 'rejected':
            return <XCircle className="h-4 w-4 text-red-600" />;
          case 'interview':
            return <Calendar className="h-4 w-4 text-blue-600" />;
          case 'reviewed':
            return <Eye className="h-4 w-4 text-orange-600" />;
          default:
            return <AlertCircle className="h-4 w-4 text-gray-600" />;
        }
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'hired':
        return 'default';
      case 'rejected':
        return 'destructive';
      case 'interview':
        return 'secondary';
      case 'reviewed':
        return 'outline';
      case 'pending':
      default:
        return 'secondary';
    }
  };

  const activities = processRecentActivities();

  // Recent statistics
  const recentStats = {
    newApplications: applications.filter((app) => {
      const dayAgo = new Date();
      dayAgo.setDate(dayAgo.getDate() - 1);
      return new Date(app.createdAt) > dayAgo;
    }).length,
    pendingReview: applications.filter((app) => app.status === 'pending').length,
    scheduledInterviews: applications.filter((app) => app.status === 'interview').length,
  };

  return (
    <div className="space-y-4">
      {/* Quick Stats */}
      <Card>
        <CardHeader className="flex-col">
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Today's Summary
          </CardTitle>
          <CardDescription>Recent activity overview</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-xl font-bold text-blue-600">{recentStats.newApplications}</div>
              <div className="text-xs text-muted-foreground">New Applications</div>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <div className="text-xl font-bold text-orange-600">{recentStats.pendingReview}</div>
              <div className="text-xs text-muted-foreground">Pending Review</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-xl font-bold text-green-600">
                {recentStats.scheduledInterviews}
              </div>
              <div className="text-xs text-muted-foreground">Interviews</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity Feed */}
      <Card>
        <CardHeader className="flex-col">
          <CardTitle className="flex items-center gap-2">
            <UserCheck className="h-5 w-5" />
            Recent Activity
          </CardTitle>
          <CardDescription>Latest updates on applications and candidates</CardDescription>
        </CardHeader>
        <CardContent>
          {activities.length > 0 ? (
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4">
                {activities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-shrink-0 mt-1">
                      {getActivityIcon(activity.type, activity.status)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {activity.candidate.name}
                        </p>
                        <Badge
                          variant={getStatusBadgeVariant(activity.status)}
                          className="ml-2 text-xs"
                        >
                          {activity.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-xs text-gray-500">{activity.job.title}</p>
                        <p className="text-xs text-gray-400">
                          {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <UserCheck className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No recent activity</p>
              <p className="text-sm">New applications and updates will appear here</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Action Items */}
      <Card>
        <CardHeader className="flex-col">
          <CardTitle>Action Required</CardTitle>
          <CardDescription>Items that need your attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentStats.pendingReview > 0 && (
              <div className="flex items-center justify-between p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-5 w-5 text-orange-600" />
                  <div>
                    <p className="font-medium text-orange-800">
                      {recentStats.pendingReview} applications awaiting review
                    </p>
                    <p className="text-sm text-orange-600">
                      Review pending applications to keep the hiring process moving
                    </p>
                  </div>
                </div>
                <Badge variant="outline" className="text-orange-600 border-orange-600">
                  {recentStats.pendingReview}
                </Badge>
              </div>
            )}

            {recentStats.scheduledInterviews > 0 && (
              <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-blue-800">
                      {recentStats.scheduledInterviews} interviews scheduled
                    </p>
                    <p className="text-sm text-blue-600">
                      Prepare for upcoming interviews and candidate evaluations
                    </p>
                  </div>
                </div>
                <Badge variant="outline" className="text-blue-600 border-blue-600">
                  {recentStats.scheduledInterviews}
                </Badge>
              </div>
            )}

            {recentStats.pendingReview === 0 && recentStats.scheduledInterviews === 0 && (
              <div className="text-center py-6 text-muted-foreground">
                <CheckCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No action items at the moment</p>
                <p className="text-xs">You're all caught up!</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecentActivity;
