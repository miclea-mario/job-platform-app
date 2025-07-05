import { Skeleton } from './ui/skeleton';

const ProfileLoading = () => {
  return (
    <div className="flex animate-pulse flex-col items-end space-y-2 w-full">
      <Skeleton className="h-4 w-[150px]" />
      <Skeleton className="h-4 w-[120px]" />
    </div>
  );
};

export default ProfileLoading;
