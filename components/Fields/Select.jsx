import {
  SelectContent,
  SelectTrigger,
  Select as SelectUI,
  SelectValue,
} from '@components/ui/select';

const Select = ({ children, placeholder, value, onChange, ...props }) => {
  return (
    <SelectUI value={value} onValueChange={onChange} {...props}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>{children}</SelectContent>
    </SelectUI>
  );
};

export default Select;
