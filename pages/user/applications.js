import { checkAuth, withAuth } from '@auth';
import { ApplicationsTable, Layout } from '@components/User';

// Mock data for applications
const mockApplications = [
  {
    id: 1,
    job: {
      title: 'Senior Frontend Developer',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      employmentType: 'Full-time',
      salary: { min: 120000, max: 180000 },
    },
    status: 'PENDING',
    appliedAt: '2024-03-28',
  },
  {
    id: 2,
    job: {
      title: 'Full Stack Engineer',
      company: 'StartupX',
      location: 'Remote',
      employmentType: 'Full-time',
      salary: { min: 90000, max: 140000 },
    },
    status: 'REVIEWING',
    appliedAt: '2024-03-25',
  },
  {
    id: 3,
    job: {
      title: 'Backend Developer',
      company: 'Enterprise Solutions',
      location: 'New York, NY',
      employmentType: 'Contract',
      salary: { min: 100000, max: 150000 },
    },
    status: 'ACCEPTED',
    appliedAt: '2024-03-20',
  },
];

const Page = () => {
  return (
    <Layout>
      <ApplicationsTable />
    </Layout>
  );
};

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
