import { Badge } from '@components/ui/badge';

const UserStatusCell = ({ value }) => {
  return (
    <div>
      {value ? (
        <Badge variant="default">Active</Badge>
      ) : (
        <Badge variant="destructive">Inactive</Badge>
      )}
    </div>
  );
};

export default UserStatusCell;
