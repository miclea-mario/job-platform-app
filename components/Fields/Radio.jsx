import { Label } from '@components/ui/label';
import { RadioGroupItem } from '@components/ui/radio-group';
import { useContext } from 'react';
import RadioContext from './RadioContext';

const Radio = ({ children, ...props }) => {
  const { name, selectedValue, onChange } = useContext(RadioContext);
  props.defaultChecked = props.value === selectedValue;

  // add context values to props
  props.name = name;
  props.onChange = onChange;

  return (
    <div className="flex items-center space-x-2">
      <RadioGroupItem name={props.value} {...props} />
      <Label htmlFor={props.value}>{children}</Label>
    </div>
  );
};

export default Radio;
