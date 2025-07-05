'use client';
import { DashboardLayout } from '@components';
import dynamic from 'next/dynamic';

// Dynamically import the Agora component with SSR disabled
const InterviewRoom = dynamic(() => import('../components/Interview/InterviewRoom'), {
  ssr: false,
});

const Page = () => {
  return (
    <DashboardLayout title="Interview" role="company">
      <div className="prose max-w-full">
        <h2 className="mb-4 font-semibold">Interview Room</h2>
        <InterviewRoom />
      </div>
    </DashboardLayout>
  );
};

export default Page;
