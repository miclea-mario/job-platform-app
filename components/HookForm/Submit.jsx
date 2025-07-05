import { Button } from '@components/ui/button';
import { Loader2 } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

const Submit = ({ children, isLoading, ...props }) => {
  const {
    formState: { isSubmitting },
  } = useFormContext();
  const disabled = isLoading || isSubmitting;
  // Override the disabled prop when passed
  props.disabled = disabled;

  return (
    <div className="inline-flex items-center relative">
      <Button type="submit" {...props}>
        {disabled && <Loader2 className="animate-spin" />}
        <div>{children}</div>
      </Button>
    </div>
  );
};

export default Submit;
