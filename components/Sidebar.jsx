import { Pages } from '@components';
import { SidebarContent, Sidebar as SidebarUI } from '@components/ui/sidebar';

const Sidebar = ({ role, ...props }) => {
  return (
    <SidebarUI variant="inset" {...props}>
      <SidebarContent className="no-scrollbar">
        <Pages role={role} />
      </SidebarContent>
    </SidebarUI>
  );
};

export default Sidebar;
