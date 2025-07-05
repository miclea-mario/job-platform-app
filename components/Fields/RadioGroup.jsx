import { RadioGroup as RadioGroupUI } from '@components/ui/radio-group';

const RadioGroup = ({ name, selectedValue, onChange, className, children }) => {
  return (
    <RadioGroupUI onValueChange={onChange} className={className}>
      {children}
    </RadioGroupUI>
  );
};

export default RadioGroup;
