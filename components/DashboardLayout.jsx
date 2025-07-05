import { MenuButton, Profile, Sidebar } from '@components';
import { useProfile } from '@hooks';
import { SidebarInset, SidebarProvider, SidebarTrigger } from './ui/sidebar';

const DashboardLayout = ({ title, children }) => {
  const { me } = useProfile();

  return (
    <SidebarProvider className="bg-gray-50">
      <Sidebar role={me?.role} />
      <SidebarInset>
        <main className="p-4">
          <div className="mb-12 flex items-center">
            <div className="flex flex-1 gap-2">
              <SidebarTrigger className="-ml-1" />
              <div className="text-2xl font-semibold">{title}</div>
            </div>
            <Profile />
            <MenuButton />
          </div>
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
