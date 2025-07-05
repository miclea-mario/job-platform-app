import { Input } from '@components/ui/input';
import { useDropdown } from '@hooks';
import OptionList from './OptionList';

const Dropdown = ({ children, value, onChange, placeholder, disabled }) => {
  const { inputItems, ...downshift } = useDropdown({ children, value, onChange });

  return (
    <div className="relative">
      <Input
        value={downshift.selectedItem?.label || ''}
        className="-my-2 w-full outline-none"
        readOnly={true}
        placeholder={placeholder}
        disabled={disabled}
        {...downshift.getToggleButtonProps()}
      />
      <OptionList {...downshift}>{inputItems}</OptionList>
    </div>
  );
};

export default Dropdown;
