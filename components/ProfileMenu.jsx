import logout from '@api/logout';
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@components/ui/dropdown-menu';
import { router } from '@lib';
import { UserRound } from 'lucide-react';

const ProfileMenu = ({ me }) => {
  const role = me?.role;

  if (!role) {
    return (
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="cursor-pointer" onSelect={() => router.push('/login')}>
          Login
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onSelect={() => router.push('/signup')}>
          Signup
        </DropdownMenuItem>
      </DropdownMenuContent>
    );
  }

  return (
    <DropdownMenuContent align="end">
      {role === 'admin' && (
        <DropdownMenuItem className="cursor-pointer" onSelect={() => router.push('/admin')}>
          Dashboard
        </DropdownMenuItem>
      )}

      {role === 'company' && (
        <DropdownMenuItem className="cursor-pointer" onSelect={() => router.push('/company')}>
          Dashboard
        </DropdownMenuItem>
      )}

      {role != 'admin' && (
        <>
          <DropdownMenuItem
            className="cursor-pointer flex items-center justify-between gap-2"
            onSelect={() => router.push(`/${role}/profile`)}
          >
            Profile <UserRound className="h-4 w-4" />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
        </>
      )}

      <DropdownMenuItem className="cursor-pointer" onSelect={logout}>
        Logout
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
};

export default ProfileMenu;
