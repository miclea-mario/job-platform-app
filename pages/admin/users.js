import { checkAuth, withAuth } from '@auth';
import { DashboardLayout } from '@components';
import { UsersTable } from '@components/Admin';
import { useState } from 'react';

const Page = () => {
  const [options, setOptions] = useState({});

  return (
    <DashboardLayout title="Dashboard">
      <div className="prose max-w-full">
        <UsersTable options={options} />
      </div>
    </DashboardLayout>
  );
};

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
