import { ProfileLoading, ProfileMenu, ProfileSuccess } from '@components';
import { DropdownMenu, DropdownMenuTrigger } from '@components/ui/dropdown-menu';
import { getNameInitials } from '@functions';
import { useProfile } from '@hooks';
import { UserRound } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const Profile = () => {
  const { status, me } = useProfile();

  return (
    <DropdownMenu className="relative flex items-center gap-4">
      <DropdownMenuTrigger
        className="hidden cursor-pointer items-center space-x-2 md:flex"
        role="button"
      >
        <div className="flex items-center gap-2">
          {status === 'loading' && <ProfileLoading />}
          {status === 'success' && <ProfileSuccess {...me} />}
          <Avatar className="border">
            <AvatarImage src={me?.avatar} alt={me?.name} />
            <AvatarFallback>
              {getNameInitials(me?.name) || <UserRound className="h-6 w-6" />}
            </AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <ProfileMenu me={me} />
    </DropdownMenu>
  );
};

export default Profile;
