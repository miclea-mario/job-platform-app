import { toggleUserStatus } from '@api/admin';
import { Button } from '@components/ui/button';
import { useMutation } from '@hooks';

const UserActionsCell = ({ userId, isActive, currentUserRole }) => {
  const mutation = useMutation(toggleUserStatus, {
    invalidateQueries: ['admin/users'],
  });

  const handleToggle = () => {
    mutation.mutate(userId);
  };

  // Don't show actions for admin users (to prevent admins from deactivating other admins)
  if (currentUserRole === 'admin') {
    return <span className="text-muted-foreground text-sm">-</span>;
  }

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant={isActive ? 'destructive' : 'default'}
        size="sm"
        onClick={handleToggle}
        disabled={mutation.isLoading}
        className="h-7 px-2 text-xs"
      >
        {mutation.isLoading ? 'Loading...' : isActive ? 'Deactivate' : 'Activate'}
      </Button>
    </div>
  );
};

export default UserActionsCell;
