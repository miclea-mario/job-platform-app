import { RadioGroup } from '@components/Fields';
import { Label } from '@components/ui/label';
import { RadioGroupItem } from '@components/ui/radio-group';
import { BriefcaseBusiness, User } from 'lucide-react';

const RoleRadioGroup = ({ ...props }) => {
  return (
    <RadioGroup
      name="role"
      className="grid-cols-2 min-w-[300px] max-w-[400px]"
      defaultValue="1"
      {...props}
    >
      <div className="relative flex flex-col gap-4 rounded-lg border-2 border-input bg-white p-4 shadow-sm shadow-black/5 has-[[data-state=checked]]:border-ring">
        <div className="flex justify-between gap-2">
          <RadioGroupItem id="user" value="user" className="order-1 after:absolute after:inset-0" />
          <User className="opacity-60" size={16} strokeWidth={2} aria-hidden="true" />
        </div>
        <Label htmlFor="user">Jobseeker</Label>
      </div>
      <div className="relative flex flex-col gap-4 rounded-lg border-2 border-input bg-white p-4 shadow-sm shadow-black/5 has-[[data-state=checked]]:border-ring">
        <div className="flex justify-between gap-2">
          <RadioGroupItem
            id="company"
            value="company"
            className="order-1 after:absolute after:inset-0"
          />
          <BriefcaseBusiness className="opacity-60" size={16} strokeWidth={2} aria-hidden="true" />
        </div>
        <Label htmlFor="company">Company</Label>
      </div>
    </RadioGroup>
  );
};

export default RoleRadioGroup;
