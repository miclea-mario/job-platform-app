import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

const Password = (props) => {
  const [showPassword, toggle] = useState(false);
  const type = showPassword ? 'text' : 'password';
  const ActionIcon = showPassword ? Eye : EyeOff;

  return (
    <div className="relative">
      <Input type={type} {...props} />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
        onClick={() => toggle(!showPassword)}
        tabIndex="-1"
      >
        <ActionIcon className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default Password;
