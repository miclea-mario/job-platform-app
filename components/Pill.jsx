import { classnames } from '@lib';
import { Badge } from './ui/badge';

const Pill = ({ children, className, ...props }) => {
  return (
    <div className="inline-block" {...props}>
      <Badge variant="outline" className={classnames(className || 'bg-gray-200')}>
        {children}
      </Badge>
    </div>
  );
};

export default Pill;
