import { classnames } from '@lib';

function Skeleton({ className, ...props }) {
  return (
    <div className={classnames('animate-pulse rounded-md bg-primary/10', className)} {...props} />
  );
}

export { Skeleton };
