import { SidebarGroup, SidebarGroupLabel } from './ui/sidebar';

const MenuGroup = ({ label, children }) => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <div>{children}</div>
    </SidebarGroup>
  );
};

export default MenuGroup;
