import { classnames } from '@lib';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import * as React from 'react';

const Progress = React.forwardRef(
  ({ className, value, indicatorColor = 'bg-primary', ...props }, ref) => (
    <ProgressPrimitive.Root
      ref={ref}
      className={classnames(
        'relative h-2 w-full overflow-hidden rounded-full bg-gray-100',
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={classnames('h-full w-full flex-1  transition-all', indicatorColor)}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
);
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
