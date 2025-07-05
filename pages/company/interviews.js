import { checkAuth, withAuth } from '@auth';
import { DashboardLayout, Loading } from '@components';
import InterviewDetailsModal from '@components/Company/InterviewDetailsModal';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import {
  Calendar,
  CalendarCurrentDate,
  CalendarMonthView,
  CalendarNextTrigger,
  CalendarPrevTrigger,
  CalendarTodayTrigger,
} from '@components/ui/full-calendar';
import { useDisclosure, useQuery } from '@hooks';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, Users } from 'lucide-react';
import { useState } from 'react';

const Page = () => {
  const { data, status } = useQuery('company/interviews');
  const [selectedInterview, setSelectedInterview] = useState(null);
  const { isOpen: isModalOpen, show: showModal, hide: hideModal } = useDisclosure();

  if (status === 'loading') {
    return <Loading />;
  }

  // Calculate statistics
  const totalInterviews = data?.length || 0;
  const today = new Date();
  const todayInterviews =
    data?.filter((app) => {
      const interviewDate = new Date(app.interview.date);
      return interviewDate.toDateString() === today.toDateString();
    }).length || 0;

  const upcomingInterviews =
    data?.filter((app) => {
      const interviewDate = new Date(app.interview.date);
      return interviewDate > today;
    }).length || 0;

  const handleEventClick = (event) => {
    // Find the full application data
    const application = data.find((app) => app.interview._id === event.id);
    setSelectedInterview(application);
    showModal();
  };

  // Format interviews for the calendar
  const calendarEvents = data?.map((application) => {
    // Create a date object from the interview date and time
    const startDate = new Date(application.interview.date);

    // Parse time from format "HH:MM" (e.g., "10:00")
    if (application.interview.time) {
      const [hours, minutes] = application.interview.time.split(':').map(Number);
      startDate.setHours(hours, minutes, 0);
    }

    // Create end date (default to 1 hour after start time)
    const endDate = new Date(startDate);
    endDate.setHours(endDate.getHours() + 1);

    return {
      id: application.interview._id,
      title: `${application.user?.name || 'Candidate'} - ${application.job?.title || 'Interview'}`,
      start: startDate,
      end: endDate,
      color: 'blue', // We'll use avatar instead of color
      user: application.user,
      job: application.job,
      application: application, // Keep the original data for reference
    };
  });

  return (
    <DashboardLayout title="Interviews" role="company">
      <div className="flex flex-col space-y-6">
        {/* Header */}
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <p className="text-muted-foreground">Manage your interviews and track applicants</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Interviews</CardTitle>
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalInterviews}</div>
              <p className="text-xs text-muted-foreground">Scheduled interviews</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{todayInterviews}</div>
              <p className="text-xs text-muted-foreground">Interviews today</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{upcomingInterviews}</div>
              <p className="text-xs text-muted-foreground">Future interviews</p>
            </CardContent>
          </Card>
        </div>

        <Calendar events={calendarEvents} view="month" onEventClick={handleEventClick}>
          <div className="h-full flex flex-col">
            {/* Calendar Header */}
            <div className="flex px-6 items-center gap-2 mb-6">
              <span className="flex-1" />

              <CalendarCurrentDate />

              <div className="flex items-center gap-1">
                <CalendarPrevTrigger>
                  <ChevronLeft size={20} />
                  <span className="sr-only">Previous</span>
                </CalendarPrevTrigger>
                <CalendarTodayTrigger>Today</CalendarTodayTrigger>
                <CalendarNextTrigger>
                  <ChevronRight size={20} />
                  <span className="sr-only">Next</span>
                </CalendarNextTrigger>
              </div>
            </div>

            <CalendarMonthView />
          </div>
        </Calendar>

        {/* Interview Details Modal */}
        <InterviewDetailsModal
          application={selectedInterview}
          isOpen={isModalOpen}
          onClose={() => {
            hideModal();
            setSelectedInterview(null);
          }}
        />
      </div>
    </DashboardLayout>
  );
};

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
