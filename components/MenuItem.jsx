import { Link } from '@components';
import { SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem } from '@components/ui/sidebar';
import { useRouter } from 'next/router';

const MenuItem = ({ href, value, children }) => {
  const router = useRouter();
  const { pathname } = router;
  const isActive = pathname === href;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={isActive}>
        <Link href={href}>{children}</Link>
      </SidebarMenuButton>
      {value && <SidebarMenuBadge>{value}</SidebarMenuBadge>}
    </SidebarMenuItem>
  );
};

export default MenuItem;
