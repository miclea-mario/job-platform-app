import { Link } from '@components';
import { classnames } from '@lib';
import { Briefcase, File } from 'lucide-react';

const HeaderMenu = ({ extraClass }) => {
  return (
    <div className={classnames('flex items-center gap-8', extraClass)}>
      <Link href="/jobs" className="flex text-sm items-center gap-2">
        <Briefcase className="h-5 w-5" />
        <span>Find Jobs</span>
      </Link>
      <Link href="/user/applications" className="flex text-sm items-center gap-2">
        <File className="h-5 w-5" />
        <span>My Applications</span>
      </Link>
    </div>
  );
};

export default HeaderMenu;
