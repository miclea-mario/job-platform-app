import { Badge } from '@components/ui/badge';

const UserStatusCell = ({ value }) => {
  return (
    <div>
      <Badge variant={value ? 'default' : 'destructive'}>{value ? 'Active' : 'Inactive'}</Badge>
    </div>
  );
};

export default UserStatusCell;
