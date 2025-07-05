import { Card } from '@components/ui/card';
import { Skeleton } from '@components/ui/skeleton';
import { classnames } from '@lib';

const JobListSkeleton = ({ extraClass }) => {
  return (
    <div className={classnames('flex flex-col gap-6', extraClass)}>
      {[...Array(5)].map((_, index) => (
        <Card key={index} className="p-6">
          <div className="flex items-start gap-6">
            {/* Company Logo Skeleton */}
            <Skeleton className="w-16 h-16 rounded-lg flex-shrink-0" />

            {/* Job Info Skeleton */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <Skeleton className="h-6 w-48" />
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>

              <div className="flex flex-wrap items-center gap-2 mt-4">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-32" />
              </div>

              <div className="flex items-center gap-6 mt-4">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>

            {/* Action Button Skeleton */}
            <Skeleton className="h-10 w-24 flex-shrink-0" />
          </div>
        </Card>
      ))}
    </div>
  );
};

export default JobListSkeleton;
