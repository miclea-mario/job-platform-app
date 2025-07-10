import { MenuGroup, MenuItem } from '@components';
import { SidebarMenu } from '@components/ui/sidebar';

const Pages = ({ role }) => {
  return (
    <>
      <SidebarMenu>
        <MenuGroup label="App">
          {role === 'admin' && (
            <>
              <MenuItem href="/admin/users">Manage Users</MenuItem>
              <MenuItem href="/admin/jobs">Manage Jobs</MenuItem>
              <MenuItem href="/admin">Dashboard</MenuItem>
            </>
          )}
          {role === 'company' && (
            <>
              <MenuItem href="/company">Dashboard</MenuItem>
              <MenuItem href="/company/jobs">Jobs</MenuItem>
              <MenuItem href="/company/applications">Applications</MenuItem>
              <MenuItem href="/company/interviews">Interviews</MenuItem>
            </>
          )}
        </MenuGroup>
      </SidebarMenu>
    </>
  );
};

export default Pages;
